// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlP3o7uMEb2qwBPBxqmq-XF7R-CmRB9CQ",
  authDomain: "turing-c2781.firebaseapp.com",
  databaseURL:
    "https://turing-c2781-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "turing-c2781",
  storageBucket: "turing-c2781.appspot.com",
  messagingSenderId: "1008776363528",
  appId: "1:1008776363528:web:533c9ff5e87cbb6c699bbd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
