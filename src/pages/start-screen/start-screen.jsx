import { useNavigate } from "react-router-dom";
import s from "./start-screen.module.scss";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const StartScreen = () => {
  const navigate = useNavigate();
  const controls = useAnimation();

  const handleStart = () => {
    navigate("/options");
  };

  useEffect(() => {
    const animate = async () => {
      await controls.start({ y: -20 });
    };

    setTimeout(() => {
      animate();
    }, 2100);
  }, [controls]);

  return (
    <div className={s.startScreen}>
      <motion.div
        className={s.startScreenWelcome}
        initial={{ x: -120, y: -120, scale: 0.3 }}
        animate={{ x: 0, y: 0, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <p>Welcome to</p>
      </motion.div>
      <AnimatePresence className={s.startScreenHeader}>
        <motion.h1
          initial={{ y: 130 }}
          animate={controls}
          exit={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className={s.typingEffect}>Christmas Labyrinth</span>
        </motion.h1>
      </AnimatePresence>
      <motion.button
        className={s.startScreenButton}
        onClick={handleStart}
        whileTap={{ scale: 0.8 }}
      >
        Start Game!
      </motion.button>
    </div>
  );
};

export default StartScreen;
