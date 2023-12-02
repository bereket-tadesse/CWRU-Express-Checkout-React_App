import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyB6mZRL8Uz9lZtn8pQKFbddnJ1Zdj8O9IQ',
  authDomain: 'react-express-checkout-59067.firebaseapp.com',
  projectId: 'react-express-checkout-59067',
  storageBucket: 'react-express-checkout-59067.appspot.com',
  messagingSenderId: '351688506792',
  appId: '1:351688506792:web:a862ad1638cf0fbbfbf19d',
  
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getDatabase(app);