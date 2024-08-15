// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM0vq6NOJwIyIktINIVau8kzN3DGp2nTc",
  authDomain: "aiflashcards-67aac.firebaseapp.com",
  projectId: "aiflashcards-67aac",
  storageBucket: "aiflashcards-67aac.appspot.com",
  messagingSenderId: "76738171279",
  appId: "1:76738171279:web:25bbe573fcaad3732bfbfa",
  measurementId: "G-FSR9W66NX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
