// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVqTX940sJ6LjIJ8jovH7EmcsVReQmMJI",
  authDomain: "ai-resume-builder-4d21e.firebaseapp.com",
  projectId: "ai-resume-builder-4d21e",
  storageBucket: "ai-resume-builder-4d21e.appspot.com",
  messagingSenderId: "1051444576404",
  appId: "1:1051444576404:web:45f0320a6a69c0032cf481",
  measurementId: "G-8C5ZK5W9FH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
