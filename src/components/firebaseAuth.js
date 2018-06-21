import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../assets/firebaseConfig';

firebase.initializeApp(firebaseConfig, 'auth');

export const uiConfig = {
  signInSuccessUrl: '/tlx',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export const signOut = async () => {
  const status = await firebase
    .auth()
    .signOut()
    .then(() => 'signOff')
    .catch(error => error);

  return status;
};

export default firebase;
