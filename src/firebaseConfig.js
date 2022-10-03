// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASbx3If3NY6-TEQHzSUeWfIWJ-FAr9NOI",
  authDomain: "mkk-test-4bbac.firebaseapp.com",
  projectId: "mkk-test-4bbac",
  storageBucket: "mkk-test-4bbac.appspot.com",
  messagingSenderId: "273256109366",
  appId: "1:273256109366:web:ae04e4fe2e47064ba18f97",
  measurementId: "G-Y6KB66FFJE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
