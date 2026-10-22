import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "numio-ee599.firebaseapp.com",
  projectId: "numio-ee599",
  storageBucket: "numio-ee599.firebasestorage.app",
  messagingSenderId: "497613353528",
  appId: "1:497613353528:web:d822751ff6a7421c562ccd"
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)