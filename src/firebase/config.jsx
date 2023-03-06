// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBke_WDEmpcaK0Bko-LLvRm6CechxLzfb0",
  authDomain: "newproject-5a159.firebaseapp.com",
  projectId: "newproject-5a159",
  storageBucket: "newproject-5a159.appspot.com",
  messagingSenderId: "598058936401",
  appId: "1:598058936401:web:daa8f04d3e3b67587d7070"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

