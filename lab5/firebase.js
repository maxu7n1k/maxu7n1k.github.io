// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Конфігурація Firebase (підстав свої дані)
const firebaseConfig = {
  apiKey: 'AIzaSyD3n8XyZTg6jPfQ-EXAMPLEfE3eBk3gWxHk',
  authDomain: 'restaurant-12345.firebaseapp.com',
  projectId: 'restaurant-12345',
  storageBucket: 'restaurant-12345.appspot.com',
  messagingSenderId: '526456789012',
  appId: '1:123456789012:web:a1b2c3d4e5f67890abcdef',
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Ініціалізація сервісів
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Реєстрація нового користувача
 * @param {string} email 
 * @param {string} password 
 * @returns Promise з userCredential
 */
const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Вхід користувача
 * @param {string} email 
 * @param {string} password 
 * @returns Promise з userCredential
 */
const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Вихід користувача
 * @returns Promise
 */
const logoutUser = () => {
  return signOut(auth);
};

/**
 * Збереження даних користувача у Firestore
 * @param {string} uid 
 * @param {object} userData 
 */
const saveUserData = async (uid, userData) => {
  try {
    await setDoc(doc(db, "users", uid), userData);
    console.log("Дані користувача збережено.");
  } catch (error) {
    console.error("Помилка збереження даних користувача:", error);
  }
};

export {
  auth,
  db,
  registerUser,
  loginUser,
  logoutUser,
  saveUserData
};

import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**

 * @param {string} uid 
 * @param {object} userData 
 */
async function saveUserData(uid, userData) {
  try {
    await setDoc(doc(db, "users", uid), userData);
    console.log("Дані користувача успішно збережені!");
  } catch (error) {
    console.error("Помилка при збереженні даних користувача:", error);
  }
}



/**

 * @param {string} uid 
 * @returns {Promise<object|null>} 
 */
const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      console.log("Документ користувача не знайдено");
      return null;
    }
  } catch (error) {
    console.error("Помилка отримання даних користувача:", error);
    throw error;
  }
};

export { getUserData };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);

    if (currentUser) {
      try {
        const data = await getUserData(currentUser.uid);
        setUserData(data);
        console.log("Отримані дані користувача:", data);
      } catch (error) {
        console.error("Помилка отримання даних користувача:", error);
      }
    } else {
      setUserData(null);
    }
  });

  return () => unsubscribe();
}, []);


