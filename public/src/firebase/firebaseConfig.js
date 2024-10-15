// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMrPom6M9CbqwDEIVrgXo8rFUiykenFjc",
  authDomain: "colegio-enfermeria.firebaseapp.com",
  projectId: "colegio-enfermeria",
  storageBucket: "colegio-enfermeria.appspot.com",
  messagingSenderId: "611697437358",
  appId: "1:611697437358:web:8b6fabe08679c3453d5b3f",
  measurementId: "G-QLHPTDGMMQ"
};

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);

// Obtén la instancia de Firestore
const firestore = firebase.firestore();

export { firestore };
