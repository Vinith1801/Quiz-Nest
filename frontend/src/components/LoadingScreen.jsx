// src/components/LoadingScreen.jsx
import { motion } from "framer-motion";

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.1 },
  }),
};

const LoadingScreen = () => {
  const text = "QuizNest";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* SVG Path Animation */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        <motion.path
          d="M10,50 Q50,10 90,50 Q50,90 10,50 Z"
          stroke="#6366F1"
          strokeWidth="4"
          fill="transparent"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>

      {/* Typing Text Animation */}
      <div className="flex space-x-1 text-3xl font-bold text-indigo-700 font-mono">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            {char}
          </motion.span>
        ))}
        <motion.span
          className="animate-blink"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          |
        </motion.span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
