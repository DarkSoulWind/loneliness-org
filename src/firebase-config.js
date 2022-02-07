// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM9oIJXQw6MuelOlpPaGHS3ngEMfmUMgY",
  authDomain: "loneliness-5c1a4.firebaseapp.com",
  projectId: "loneliness-5c1a4",
  storageBucket: "loneliness-5c1a4.appspot.com",
  messagingSenderId: "265535564384",
  appId: "1:265535564384:web:e22beb2859926a45e97105"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

const writeUser = async user => {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, JSON.parse(JSON.stringify(user)))
  .then(() => {
    console.log('Added user to user database.')
  })
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    writeUser(user);
  }
})

