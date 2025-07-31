import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
    try {
        const stored = localStorage.getItem("user");
        return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
    });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  const decoded = jwtDecode(res.data.token);

  const user = {
    username: res.data.username,
    id: decoded.id,
  };

  setUser(user);
  setToken(res.data.token);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(user));
};


const signup = async (data) => {
  const res = await api.post("/auth/signup", data);
  const decoded = jwtDecode(res.data.token);
  setUser({ username: res.data.username, id: decoded.id });
  setToken(res.data.token);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify({ username: res.data.username, id: decoded.id }));
  };
  const logout = () => {
  setUser(null);
  setToken(null);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
