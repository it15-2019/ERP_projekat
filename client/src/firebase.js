import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCxjvTbZGM0rsa6C-ZbCyJdp3XrtkoQNpg",
  authDomain: "erpprojekat.firebaseapp.com",
  projectId: "erpprojekat",
  storageBucket: "erpprojekat.appspot.com",
  messagingSenderId: "247744387038",
  appId: "1:247744387038:web:5ba7c9f7dc0201e4936f4f"
};

const app = initializeApp(firebaseConfig);

export default app;