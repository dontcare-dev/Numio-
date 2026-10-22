import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAUMAzs8Qh7JFCCV5eW0lsGiTqNlx9P28Q",
  authDomain: "numio-ee599.firebaseapp.com",
  projectId: "numio-ee599",
  storageBucket: "numio-ee599.firebasestorage.app",
  messagingSenderId: "497613353528",
  appId: "1:497613353528:web:d822751ff6a7421c562ccd",
  measurementId: "G-47FSVN26VV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)