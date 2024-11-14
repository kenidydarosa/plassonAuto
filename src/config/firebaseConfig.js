// // firebaseConfig.js
// import firebase from 'firebase/app';
// import 'firebase/auth';       // Se precisar de autenticação
// import 'firebase/firestore';  // Se precisar de banco de dados
// import 'firebase/storage';    // Se precisar de armazenamento

// // Assegure-se de usar os valores do GoogleService-Info.plist
// const firebaseConfig = {
//   apiKey: "AIzaSyCCYEaYZ2z26BFzjZkkhzni03KorBfyy9Q",
//   authDomain: "plassonauto-7e0c1.firebaseapp.com",
//   projectId: "plassonauto-7e0c1",
//   storageBucket: "plassonauto-7e0c1.firebasestorage.app",
//   messagingSenderId: "610641381760",
//   appId: "1:610641381760:ios:0b2651b1b15c872786d965",
// };

// // Inicializa o Firebase caso ainda não esteja inicializado
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export { firebase };
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Importando o AsyncStorage

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

// Obtenha as instâncias dos serviços
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage), // Aqui é onde você define o AsyncStorage como persistência
});

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, storage }; 
