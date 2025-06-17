// src/components/SplashScreen.jsx
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SplashScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold tracking-wide"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        transition={{ duration: 1 }}
      >
        <motion.span
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.1 }}
          transition={{
            yoyo: Infinity,
            duration: 1,
            ease: "easeInOut",
          }}
        >
          QuizNest 🧠
        </motion.span>
      </motion.h1>
      <motion.p
        className="mt-4 text-lg sm:text-xl font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Loading your quiz journey...
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
