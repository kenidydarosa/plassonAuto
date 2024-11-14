// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyCco1Y-F2ZnEQDl8g1qB90tHphgqj06PKU",
//   authDomain: "plassonauto-7e0c1.firebaseapp.com",
//   projectId: "plassonauto-7e0c1",
//   storageBucket: "plassonauto-7e0c1.firebasestorage.app",
//   messagingSenderId: "610641381760",
//   appId: "1:610641381760:web:fa9bc8514abb603f86d965",
//   measurementId: "G-TY2G8YPSHC"
// };

// // Inicializa o Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// export { app, storage }; 

// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCco1Y-F2ZnEQDl8g1qB90tHphgqj06PKU",
  authDomain: "plassonauto-7e0c1.firebaseapp.com",
  projectId: "plassonauto-7e0c1",
  storageBucket: "plassonauto-7e0c1.firebasestorage.app",
  messagingSenderId: "610641381760",
  appId: "1:610641381760:web:fa9bc8514abb603f86d965",
  measurementId: "G-TY2G8YPSHC"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage }; 
