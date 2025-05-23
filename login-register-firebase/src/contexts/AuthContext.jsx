// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { listenAuthChanges, loginUser, registerUser, logoutUser } from "../firebase/Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenAuthChanges((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => loginUser(email, password);
  const register = (email, password) => registerUser(email, password);
  const logout = () => logoutUser();

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};