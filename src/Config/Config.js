import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage' 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_UK440NsYs3Mv7KqdefBvqF2EqzMdHkE",
    authDomain: "ecommerce-web-react-8dd96.firebaseapp.com",
    projectId: "ecommerce-web-react-8dd96",
    storageBucket: "ecommerce-web-react-8dd96.appspot.com",
    messagingSenderId: "172085721115",
    appId: "1:172085721115:web:a0a555622d9b11f85d60be",
    measurementId: "G-9H9E3JWK3F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fs = getFirestore(app);
export const storage = getStorage(app)
 


