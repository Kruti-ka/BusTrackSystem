import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDQPOImxI-2976grCFJ_77nkOIaPBRalj0",
  authDomain: "tracking-system-f4617.firebaseapp.com",
  databaseURL: "https://tracking-system-f4617-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tracking-system-f4617",
  storageBucket: "tracking-system-f4617.appspot.com",
  messagingSenderId: "274709147711",
  appId: "1:274709147711:web:730665ff54bc5da2e9c88a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
