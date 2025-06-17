import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-20 px-6 py-8 bg-white/70 backdrop-blur-md shadow-lg rounded-3xl text-center space-y-6">
      <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">👋 Hello, {user.username}</h1>

      <div className="text-left bg-white/60 rounded-xl p-4 shadow-inner border border-gray-200">
        <p className="text-gray-700 mb-3">
          <span className="font-semibold">🆔 User ID:</span> {user.id}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">🙍 Username:</span> {user.username}
        </p>
        {/* Future addition:
        <p className="text-gray-700"><span className="font-semibold">📅 Joined:</span> {user.createdAt}</p> */}
      </div>

      <button
        onClick={() => {
          logout();
          navigate("/signin");
        }}
        className="mt-6 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-2 rounded-full shadow-lg transition duration-200 ease-in-out"
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default Profile;
