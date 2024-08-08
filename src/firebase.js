// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';        // Use named import
import { getFirestore } from 'firebase/firestore';  // Import firestore from firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQ0oCwbVW77mc04QMgK7WXIGxDl0cRzTE",
    authDomain: "chat-66ca8.firebaseapp.com",
    projectId: "chat-66ca8",
    storageBucket: "chat-66ca8.appspot.com",
    messagingSenderId: "178691040777",
    appId: "1:178691040777:web:bcbfb4fb9ccb7cce777ad8",
    measurementId: "G-T96YS351TM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Export auth
export const auth = getAuth(app);  // Initialize auth with app
export const firestore = getFirestore(app);  // Initialize firestore with app
