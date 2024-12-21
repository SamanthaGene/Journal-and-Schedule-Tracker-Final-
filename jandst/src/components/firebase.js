import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiQunSa7JF6vee-Rn_UxtdRP3z68skFdA",
  authDomain: "schedule-and-journal-tracker.firebaseapp.com",
  projectId: "schedule-and-journal-tracker",
  storageBucket: "schedule-and-journal-tracker.firebasestorage.app",
  messagingSenderId: "272941169630",
  appId: "1:272941169630:web:c3446aa372f4c996a1fb4f",
  measurementId: "G-QS12K353GH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;