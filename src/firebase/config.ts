// firebase/config.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  onst firebaseConfig = {
  apiKey: ",
  authDomain: 
  projectId: 
  storageBucket: 
  messagingSenderId:
  appId: "
  measurementId: 
};

// ✅ THIS IS THE FIX
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();