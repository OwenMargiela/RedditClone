import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCR4Cipa8Pc55GAdpfr1IyxgardgD-kxVA",
  authDomain: "reddit-clone-4dbdd.firebaseapp.com",
  projectId: "reddit-clone-4dbdd",
  storageBucket: "reddit-clone-4dbdd.appspot.com",
  messagingSenderId: "736842410452",
  appId: "1:736842410452:web:18e1ced4d6c758a9934e41",
};

// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const firestore = getFirestore(app);
const storage = getStorage(app);
// console.log(app, firestore, app);

export { app, auth, firestore, storage };
