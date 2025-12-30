import React, { useState } from "react";
import "../styles/FinalMessage.css";
import santaImg from "../img/outdoor-photo-santa-claus-his-260nw-2691466547-removebg-preview.png";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Gift, LogOut } from "lucide-react";

function FinalMessage({ setPage }) {
  const [isOpened, setIsOpened] = useState(false);
  const kidName = localStorage.getItem("kidName") || "Champion";

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="final-page">
      {/* Snowflakes */}
      <div className="snow-container">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="snowflake" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 8}s`
          }} />
        ))}
      </div>

      <button className="logout-btn" onClick={logout}>
        <LogOut size={16} /> Logout
      </button>

      <motion.div
        className="santa-sleigh"
        animate={{ x: ["-100vw", "100vw"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <img src={santaImg} alt="Santa Sleigh" />
      </motion.div>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            className="gift-container"
            onClick={() => setIsOpened(true)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: [0, 5, -5, 0] }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="gift-box">🎁</div>
            <p className="click-text">
              A surprise for {kidName}! <br /> Tap to open
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="final-card"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <div className="final-star">
              <Star size={64} fill="var(--christmas-gold)" color="var(--christmas-gold)" />
            </div>
            <h2>Merry Christmas!</h2>
            <p className="final-msg">
              Great job, <strong>{kidName}</strong>! Santa has been watching and he
              is so proud of how kind and consistent you have been.
            </p>
            <p className="final-sub">🚀 SantaPath Completed!</p>
            <div className="final-reward">
              <p>
                🎅 <strong>"I am coming on December 25th!"</strong>
              </p>
              <p style={{ fontSize: "0.9rem", marginTop: "5px", opacity: 0.8 }}>
                I will send your special gift and leave it right under your tree.
                See you soon!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FinalMessage;
