import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useAuth } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import LoadingScreen from "./components/LoadingScreen"; // 🔥 Required to show while checking auth

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import History from "./pages/History";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  const { loading } = useAuth();
  const location = useLocation();
  const isAuthPage = ["/signin", "/signup"].includes(location.pathname);

  const [showSplash, setShowSplash] = useState(() => {
    return sessionStorage.getItem("quiznest_splash_shown") !== "true";
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        sessionStorage.setItem("quiznest_splash_shown", "true");
        setShowSplash(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (showSplash) return <SplashScreen />;
  if (loading) return <LoadingScreen />; // ✅ Wait until auth check completes

  return (
    <>
      {!isAuthPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Category /></ProtectedRoute>} />
          <Route path="/quiz/:id" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/result" element={<Result />} />
          <Route path="/leaderboard/:id" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
