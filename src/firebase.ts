import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app: any;
let db: any;
let auth: any;

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    // Set persistence to local
    setPersistence(auth, browserLocalPersistence)
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });
  } else {
    console.warn("Firebase configuration missing. Check your .env file.");
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { app, db, auth };

// User type
export interface UserData {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role?: string;
  createdAt: any;
  lastLoginAt?: any;
}

// Function to add email to Firestore
export const addSubscriber = async (email: string) => {
  if (!db) return { success: false, error: "Firebase not initialized" }; // Safety check
  try {
    await addDoc(collection(db, 'subscribers'), {
      email: email,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding document: ', error);
    return { success: false, error };
  }
};

export const getUserData = async (uid: string): Promise<UserData | null> => {
  if (!db) return null; // Safety check
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { uid, ...userDoc.data() } as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};
