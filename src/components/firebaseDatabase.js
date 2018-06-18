import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from '../assets/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export const createExperiment = async (userID, expID, partID) => {
  const experimentRef = await database.ref(`${userID}/${expID}/${partID}`);
  const data = await experimentRef.once('value');
  const status = data.exists();

  experimentRef.set({
    completed: false,
  });

  return { experimentRef, status };
};

export const syncExperiment = async (userID, expID, partID) => {
  const experimentRef = await database.ref(`${userID}/${expID}/${partID}`);

  const data = await experimentRef.once('value');

  return {
    experimentRef,
    data: 'data',
  };
};

export const storeData = async (experimentRef, data) => {
  await experimentRef.update(data);
};
