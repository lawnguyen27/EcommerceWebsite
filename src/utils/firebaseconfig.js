
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzeSjeazryL8fNWhbr7Vi4_UeRHWs6lZs",
  authDomain: "exe02-oheca.firebaseapp.com",
  projectId: "exe02-oheca",
  storageBucket: "exe02-oheca.appspot.com",
  messagingSenderId: "570567176382",
  appId: "1:570567176382:web:81e0182b5f4fd840f86eef",
  measurementId: "G-MTBB2LT3VB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
