import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from '../assets/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export const createExperiment = async ({ userID, experimentID, participantID }) =>
  // const experimentRef = await database.ref(`${userID}/${experimentID}/${participantID}`);

  'ref';

