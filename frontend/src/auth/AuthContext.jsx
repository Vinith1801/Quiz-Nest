import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"; // Use unified Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setAuth({ user: res.data.user, isAuthenticated: true });
      } catch (err) {
        console.warn("Auth check failed:", err.response?.data || err.message);
        setAuth({ user: null, isAuthenticated: false });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      setAuth({ user: res.data.user, isAuthenticated: true });
    } catch (err) {
      setAuth({ user: null, isAuthenticated: false });
      throw err;
    }
  };

  const signup = async (data) => {
    try {
      const res = await api.post("/auth/signup", data);
      setAuth({ user: res.data.user, isAuthenticated: true });
    } catch (err) {
      setAuth({ user: null, isAuthenticated: false });
      throw err;
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setAuth({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
