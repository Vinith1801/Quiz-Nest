import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import PageWrapper from "../components/PageWrapper";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await api.get("/quiz/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 mt-20">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
          📚 Choose a Quiz Category
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => navigate(`/quiz/${cat._id}`)}
              className="group bg-white/30 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl transition-all 
                hover:bg-white/50 hover:shadow-2xl hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <div className="text-4xl mb-3 group-hover:animate-bounce">🧩</div>
              <p className="text-blue-800 text-lg font-semibold">{cat.name}</p>
            </button>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Category;
