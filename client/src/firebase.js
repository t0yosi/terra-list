// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "terra-list.firebaseapp.com",
  projectId: "terra-list",
  storageBucket: "terra-list.appspot.com",
  messagingSenderId: "66248967011",
  appId: "1:66248967011:web:9d8ae103455a5ef2124956",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
