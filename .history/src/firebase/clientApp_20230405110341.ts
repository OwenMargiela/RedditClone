
import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAVuZyN1Pfb0btG8N8_iVNrgzWSGlzZYlY",
    authDomain: "reddit-clone-7750b.firebaseapp.com",
    projectId: "reddit-clone-7750b",
    storageBucket: "reddit-clone-7750b.appspot.com",
    messagingSenderId: "600592981476",
    appId: "1:600592981476:web:72588cf757557a7c1ebbf1"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {app,firestore,auth,storage}