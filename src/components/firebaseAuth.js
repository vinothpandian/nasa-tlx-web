import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../assets/firebaseConfig';

firebase.initializeApp(firebaseConfig, 'auth');

export const uiConfig = callback => ({
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '/',
  callbacks: {
    signInSuccessWithAuthResult: (authResult) => {
      callback(authResult.user);
      return false;
    },
  },
});

export const auth = firebase.auth();

export const user = auth.currentUser;

export const signOut = async () => {
  const status = await auth.signOut();

  return status;
};
