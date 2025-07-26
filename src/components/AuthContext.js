import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
  });

  useEffect(() => {
    // Load from localStorage on first render
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (storedToken) {
      setToken(storedToken);
      setUser({ username: storedUsername, email: storedEmail });
    }
  }, []);

  const login = (token, username, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

    setToken(token); // 💥 Add this line!
    setUser({ username, email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
