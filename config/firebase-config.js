const firebaseConfig = {
  apiKey: "AIzaSyACe57ULrtFWBkTMZaExGTuCJb8GKhawPw",
  authDomain: "finals-calculator-21.firebaseapp.com",
  projectId: "finals-calculator-21",
  storageBucket: "finals-calculator-21.firebasestorage.app",
  messagingSenderId: "234377632584",
  appId: "1:234377632584:web:bf92d92752829426f0717d",
  measurementId: "G-9CYRQR52LP"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

// Export initialized Firebase instances
export { app, analytics, auth, db }; 