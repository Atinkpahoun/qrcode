import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAKWxhGGgotpJ55K2ncYogGIG9R8JX6c38",
  authDomain: "qrcode-generator-c70a8.firebaseapp.com",
  projectId: "qrcode-generator-c70a8",
  storageBucket: "qrcode-generator-c70a8.firebasestorage.app",
  messagingSenderId: "285990291739",
  appId: "1:285990291739:web:1aa507a9e3b73647396bbe"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
