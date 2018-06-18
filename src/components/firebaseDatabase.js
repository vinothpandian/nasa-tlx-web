import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from '../assets/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export const createExperiment = async (userID, expID, partID) => 'ref';
// const experimentRef = await database.ref(`${userID}/${expID}/${partID}`);

export const storeData = async (experimentRef, data) => 'yes';

export const storeState = async (experimentRef, data) => 'yes';
