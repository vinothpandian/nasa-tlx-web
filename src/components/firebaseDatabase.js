import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from '../assets/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export const createExperiment = async (...params) => {
  const experimentRef = await database.ref(`${params.join('/')}`);
  const data = await experimentRef.once('value');
  const status = data.exists();

  experimentRef.set({
    completed: false,
  });

  return { experimentRef, status };
};

export const syncExperiment = async (...params) => {
  const experimentRef = await database.ref(`${params.join('/')}`);
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

export const fetchData = async (...params) => {
  const experimentRef = await database.ref(`${params.join('/')}`);
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

export const fetchParticipantData = async (...params) => {
  const participantRef = await database.ref(`${params.join('/')}`);
  const participantData = await participantRef.once('value');

  const status = participantData.exists();

  if (!status) {
    return {
      status,
    };
  }

  const participantList = participantData.exportVal();

  const data = Object.entries(participantList).map(([key, value]) => ({
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
