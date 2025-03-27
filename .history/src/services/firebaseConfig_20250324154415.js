import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCS2CJR9tWLrK3ckZqeJIBop9woIiYk6qo",
    authDomain: "oh-studio-ccbc0.firebaseapp.com",
    projectId: "oh-studio-ccbc0",
    storageBucket: "oh-studio-ccbc0.firebasestorage.app",
    messagingSenderId: "496885463799",
    appId: "1:496885463799:web:8810f8bedc8edd098571f2"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
