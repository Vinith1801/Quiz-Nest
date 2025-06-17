import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import PageWrapper from "../components/PageWrapper";

const Leaderboard = () => {
  const { id } = useParams(); // categoryId
  const navigate = useNavigate();
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`/quiz/leaderboard/${id}`);
        setLeaders(res.data);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [id]);

  if (loading)
    return 
  <PageWrapper>
    <div className="text-center mt-10 text-lg font-semibold animate-pulse">Loading leaderboard...</div>;
  </PageWrapper>

  return (
    <PageWrapper>
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-100 py-12 px-4 mt-3.5">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-yellow-600 mb-6">🏆 Top Performers</h1>

        {leaders.length === 0 ? (
          <p className="text-center text-gray-600">No scores yet for this category.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="text-sm text-gray-700 border-b">
                <tr>
                  <th className="p-2">Rank</th>
                  <th className="p-2">Username</th>
                  <th className="p-2">Top Score</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((entry, index) => (
                  <tr
                    key={index}
                    className={`transition duration-200 ${
                      entry.username === user?.username
                        ? "bg-yellow-100 font-bold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <td className="p-2 text-lg">{getMedal(index + 1)}</td>
                    <td className="p-2">{entry.username}</td>
                    <td className="p-2">{entry.top_score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/categories")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium shadow"
          >
            Back to Categories
          </button>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
};

export default Leaderboard;
