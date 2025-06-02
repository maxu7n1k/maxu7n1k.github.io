import React, { useState, useEffect } from "react";
import { auth, saveUserData, getUserData } from "./firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Отримати додаткові дані з Firestore
        const data = await getUserData(currentUser.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserData(userCredential.user);
      alert("Реєстрація успішна!");
    } catch (error) {
      alert("Помилка реєстрації: " + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Вхід успішний!");
    } catch (error) {
      alert("Помилка входу: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Ви вийшли з системи");
  };

  return (
    <div style={{ padding: 20 }}>
      {!user ? (
        <>
          <h2>Реєстрація / Вхід</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ display: "block", marginBottom: 10 }}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ display: "block", marginBottom: 10 }}
          />
          <button onClick={handleRegister} style={{ marginRight: 10 }}>
            Зареєструватися
          </button>
          <button onClick={handleLogin}>Увійти</button>
        </>
      ) : (
        <>
          <h2>Привіт, {user.email}</h2>
          <button onClick={handleLogout}>Вийти</button>
          <h3>Дані користувача з Firestore:</h3>
          {userData ? (
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          ) : (
            <p>Завантаження даних...</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
