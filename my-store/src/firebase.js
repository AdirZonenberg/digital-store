// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCurGE7AHuuyA8nMQAWWS-2ddDLbk_0wQk",
  authDomain: "my-store-54a9c.firebaseapp.com",
  projectId: "my-store-54a9c",
  storageBucket: "my-store-54a9c.appspot.com",
  messagingSenderId: "202746797889",
  appId: "1:202746797889:web:d6a150a47369574ff58bc0",
  measurementId: "G-S86RS1QXYC"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
