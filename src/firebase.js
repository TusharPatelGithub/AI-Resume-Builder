/**
 * Firebase optional setup.
 * Fill your .env keys, then import and use where needed.
 * This file avoids initializing the app if keys are missing.
 */
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export function getFirebaseApp() {
  if (!firebaseConfig.apiKey) return null; // not configured
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApps()[0];
}
