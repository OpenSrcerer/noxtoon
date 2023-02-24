// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4EnOb0H_2xTjPfeTxG03yqCyLq86V-kY",
  authDomain: "cs306-fp.firebaseapp.com",
  projectId: "cs306-fp",
  storageBucket: "cs306-fp.appspot.com",
  messagingSenderId: "524091073941",
  appId: "1:524091073941:web:909144d082e95262c8829c",
  measurementId: "G-6B8S94BJEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
