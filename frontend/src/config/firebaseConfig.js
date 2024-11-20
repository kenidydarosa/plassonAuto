// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCco1Y-F2ZnEQDl8g1qB90tHphgqj06PKU",
  authDomain: "plassonauto-7e0c1.firebaseapp.com",
  projectId: "plassonauto-7e0c1",
  storageBucket: "plassonauto-7e0c1.firebasestorage.app",
  messagingSenderId: "610641381760",
  appId: "1:610641381760:web:fa9bc8514abb603f86d965",
  measurementId: "G-TY2G8YPSHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;