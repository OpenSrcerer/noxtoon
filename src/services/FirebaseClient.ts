// Firebase Config
import {initializeApp, type FirebaseApp} from "firebase/app";
import {setFirestore} from "@/services/FirestoreService";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBDPOZa0o8MWt8zBY_8OlQtgDbvoedQqSI",
    authDomain: "cs306-fp.firebaseapp.com",
    projectId: "cs306-fp",
    storageBucket: "cs306-fp.appspot.com",
    messagingSenderId: "524091073941",
    appId: "1:524091073941:web:909144d082e95262c8829c",
    measurementId: "G-6B8S94BJEM"
};

// Initialize Firebase
export let firebaseApp: FirebaseApp;

export const initializeFirebase = () => {
    firebaseApp = initializeApp(firebaseConfig)
    setFirestore(getFirestore(firebaseApp))
}