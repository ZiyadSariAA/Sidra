// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAVnLR4G4YdaaXYohYQ__onPIzZPaxHcow",
  authDomain: "sedra-1efb2.firebaseapp.com",
  projectId: "sedra-1efb2",
  storageBucket: "sedra-1efb2.firebasestorage.app",
  messagingSenderId: "601221098698",
  appId: "1:601221098698:web:61332f543e62737c971833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Debug: Log Firebase configuration
console.log('Firebase initialized successfully');
console.log('Project ID:', firebaseConfig.projectId);
console.log('Auth Domain:', firebaseConfig.authDomain);
console.log('Auth instance:', auth);
console.log('DB instance:', db);

// Ensure we're not using emulator
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode - checking for emulator connection');
  console.log('Auth config:', auth.config);
}

export { auth, db };
export default app; 