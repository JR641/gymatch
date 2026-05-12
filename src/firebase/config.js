import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiymUh20KLQgtoOar8wxe2VR-hf71VtEk",
  authDomain: "gymatch-2da05.firebaseapp.com",
  projectId: "gymatch-2da05",
  storageBucket: "gymatch-2da05.firebasestorage.app",
  messagingSenderId: "909648702945",
  appId: "1:909648702945:web:0e3848f209ed3b22b276a0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);