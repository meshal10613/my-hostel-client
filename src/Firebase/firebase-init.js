// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPt3CbJoUbGI-c9w0GaIOt4VW05oWXURk",
    authDomain: "my-hostel-a1da5.firebaseapp.com",
    projectId: "my-hostel-a1da5",
    storageBucket: "my-hostel-a1da5.firebasestorage.app",
    messagingSenderId: "883453149652",
    appId: "1:883453149652:web:eb24a0817bb529f2de9641"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);