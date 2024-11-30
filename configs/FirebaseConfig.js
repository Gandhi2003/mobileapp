// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrKw66NBS9ruWr4Omp6NGF6OCErEPv3Lg",
  authDomain: "business-list-app.firebaseapp.com",
  projectId: "business-list-app",
  storageBucket: "business-list-app.appspot.com",
  messagingSenderId: "538586480758",
  appId: "1:538586480758:web:296caf8cf8f2e273c0df57",
  measurementId: "G-SJ6T3JB3L7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);

