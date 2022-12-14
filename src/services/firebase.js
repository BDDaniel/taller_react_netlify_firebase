import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDHLrjuwsbeYwYJ7eM8ioGiCIfYVbvudKU",
  authDomain: "taller-react-netlify-firebase.firebaseapp.com",
  projectId: "taller-react-netlify-firebase",
  storageBucket: "taller-react-netlify-firebase.appspot.com",
  messagingSenderId: "1002984678924",
  appId: "1:1002984678924:web:657518bd0bdc56797fb029"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }