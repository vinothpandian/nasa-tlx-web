import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from '../assets/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const firebaseRef = firebase;

export const uiConfig = {
  signInSuccessUrl: '/tlx',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export const auth = firebase.auth();

export const getUserInfo = async () => {
  const user = await auth.currentUser;

  if (user) {
    return { loginStatus: true, userID: user.uid, username: user.displayName };
  }
  return {
    loginStatus: false,
  };
};

export const signOut = async () => {
  const status = await firebase
    .auth()
    .signOut()
    .then(() => 'signOff')
    .catch(error => error);

  return status;
};

export const database = firebase.database();

export const createExperiment = async (...params) => {
  const { userID } = await getUserInfo();

  const experimentRef = await database.ref(`/users/${userID}/${params.join('/')}`);
  const data = await experimentRef.once('value');
  const status = data.exists();

  experimentRef.set({
    completed: false,
  });

  return { experimentRef, status };
};

export const syncExperiment = async (...params) => {
  const { userID } = await getUserInfo();

  const experimentRef = await database.ref(`/users/${userID}/${params.join('/')}`);
  const experimentData = await experimentRef.once('value');

  const status = experimentData.exists();

  if (!status) {
    return {
      status,
    };
  }

  return {
    experimentRef,
    data: experimentData.exportVal(),
    status,
  };
};

export const storeData = async (experimentRef, data) => {
  await experimentRef.update(data);
};

export const fetchExperimentList = async () => {
  const { userID } = await getUserInfo();

  const experimentRef = await database.ref(`/users/${userID}`);
  const experimentData = await experimentRef.once('value');

  const status = experimentData.exists();

  if (!status) {
    return {
      status,
    };
  }

  return {
    data: Object.keys(experimentData.exportVal()),
    status,
  };
};

const jsToCSV = (data) => {
  let csvData =
    '"Participant ID","Date","Raw rating - Effort","Raw rating - Frustration Level","Raw rating - Mental Demand","Raw rating - Performance","Raw rating - Physical Demand","Raw rating - Temporal Demand","Workload tally - Effort","Workload tally - Frustration Level","Workload tally - Mental Demand","Workload tally - Performance","Workload tally - Physical Demand","Workload tally - Temporal Demand","Adjusted rating - Effort","Adjusted rating - Frustration Level","Adjusted rating - Mental Demand","Adjusted rating - Performance","Adjusted rating - Physical Demand","Adjusted rating - Temporal Demand"\r\n';

  Object.entries(data).forEach(([key, value]) => {
    const scale = Object.values(value.scale).join('","');
    const workload = Object.values(value.workload).join('","');
    const adjustedRating = Object.values(value.adjustedRating).join('","');

    csvData = csvData.concat(`"${key}","${value.date}","${
      value.weightedRating
    }","${scale}","${workload},${adjustedRating}"\r\n`);
  });

  return csvData;
};

export const fetchExperimentData = async (expID, format) => {
  const { userID } = await getUserInfo();

  const experimentRef = await database.ref(`/users/${userID}/${expID}`);
  const experimentData = await experimentRef.once('value');

  const status = experimentData.exists();

  if (!status) {
    return {
      status,
    };
  }

  const dataObject = experimentData.exportVal();

  let data = null;

  if (format === 'json') {
    data = JSON.stringify(dataObject, null, 2);
  } else if (format === 'csv') {
    data = jsToCSV(dataObject);
  }

  return {
    data,
    status,
  };
};

export const fetchParticipantData = async (...params) => {
  const { userID } = await getUserInfo();

  const participantRef = await database.ref(`/users/${userID}/${params.join('/')}`);
  const participantData = await participantRef.once('value');

  const status = participantData.exists();

  if (!status) {
    return {
      status,
    };
  }

  const participantList = participantData.exportVal();

  const data = Object.entries(participantList)
    .filter(([key, value]) => value.completed)
    .map(([key, value]) => ({
      partID: key,
      date: value.date,
      weightedRating: value.weightedRating,
      completed: value.completed,
    }));

  return {
    data,
    status,
  };
};
