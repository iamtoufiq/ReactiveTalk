//here we have added all the config of firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEMNP5qsA45dCTtyURB5P7ciOXvcrB2aE",
  authDomain: "mychat-84569.firebaseapp.com",
  projectId: "mychat-84569",
  storageBucket: "mychat-84569.appspot.com",
  messagingSenderId: "639807074466",
  appId: "1:639807074466:web:13281ee2760ac90d5d27fb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
