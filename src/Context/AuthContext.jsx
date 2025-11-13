// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email/password login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Register (you may not call this from login page)
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Google login
  const googleLogin = () => signInWithPopup(auth, googleProvider);

  // Logout
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
