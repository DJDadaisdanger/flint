import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzcMMeLJ1WnFy3NEAukAoRPqeOmAmyFJ4",
  authDomain: "flint-5cbda.firebaseapp.com",
  projectId: "flint-5cbda",
  storageBucket: "flint-5cbda.firebasestorage.app",
  messagingSenderId: "544564156505",
  appId: "1:544564156505:web:bb68c1f705f347eb707948",
  measurementId: "G-698GR92PX0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
