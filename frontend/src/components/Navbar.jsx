import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Hide navbar on login/signup
  if (["/signin", "/signup"].includes(location.pathname)) return null;

  const linkBase = "block px-4 py-2 rounded-md transition";
  const linkStyle = "text-gray-700 hover:text-blue-600";
  const activeStyle = "text-blue-700 font-semibold border-b-2 border-blue-700";

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">
          🧠 QuizNest
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm sm:text-base font-medium items-center">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Home</NavLink>
          <NavLink to="/categories" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Categories</NavLink>
          <NavLink to="/history" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>History</NavLink>
          <NavLink to="/profile" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Profile</NavLink>
          {user ? (
            <button onClick={logout} className="text-red-500 hover:text-red-700 transition px-4 py-2 rounded-md">Logout</button>
          ) : (
            <NavLink to="/signin" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Login</NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
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

      {/* Mobile Nav Links */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-sm font-medium">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Home</NavLink>
          <NavLink to="/categories" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Categories</NavLink>
          <NavLink to="/history" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>History</NavLink>
          <NavLink to="/profile" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Profile</NavLink>
          {user ? (
            <button onClick={() => { logout(); setIsOpen(false); }} className="text-red-500 hover:text-red-700 transition w-full text-left px-4 py-2">Logout</button>
          ) : (
            <NavLink to="/signin" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : linkStyle}`}>Login</NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
