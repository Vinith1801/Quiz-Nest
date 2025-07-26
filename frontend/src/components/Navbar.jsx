import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (["/signin", "/signup"].includes(location.pathname)) return null;

  const linkBase = "block px-4 py-2 rounded-md transition";
  const linkStyle = "text-gray-700 hover:text-blue-600";
  const activeStyle = "text-blue-700 font-semibold border-b-2 border-blue-700";

  const navLinks = (
    <>
      <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Home</NavLink>
      <NavLink to="/categories" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Categories</NavLink>
      <NavLink to="/history" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>History</NavLink>
      <NavLink to="/profile" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Profile</NavLink>
      {user ? (
        <button onClick={() => { logout(); setIsOpen(false); }} className="text-red-500 hover:text-red-700 transition px-4 py-2 rounded-md">
          Logout
        </button>
      ) : (
        <NavLink to="/signin" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Login</NavLink>
      )}
    </>
  );

  return (
    <nav className="bg-white/30 backdrop-blur-lg shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">
          🧠 QuizNest
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-sm sm:text-base font-medium items-center">
          {navLinks}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-700 focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden px-6 pb-4 space-y-2 text-sm font-medium bg-white/50 backdrop-blur-lg border-t border-white/30"
          >
            {navLinks}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
