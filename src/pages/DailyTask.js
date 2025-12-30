import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { tasks } from "../data/tasks";
import "../styles/DailyTask.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Star, Gift, Sparkles } from "lucide-react";

function DailyTask({ setPage }) {
  const [day, setDay] = useState(1);
  const [randomTask, setRandomTask] = useState("");

  useEffect(() => {
    // 🔹 Initialize Day
    const savedDay = localStorage.getItem("day");
    if (savedDay) setDay(Number(savedDay));

    // 🔹 Pick a random task on mount
    const ran = tasks[Math.floor(Math.random() * tasks.length)];
    setRandomTask(ran);
  }, [day]);

  const completeTask = async () => {
    const kidId = localStorage.getItem("kidId");

    try {
      if (kidId) {
        // Optimistic update
        axios.post("http://localhost:5000/api/kid/task", { kidId, day }).catch(console.error);
      }

      const nextDay = day + 1;
      setDay(nextDay);
      localStorage.setItem("day", nextDay);

      // 🎁 Success Animation
      await Swal.fire({
        title: "⭐ Star Lit!",
        html: "You're one step closer to Christmas!<br/><b>Keep shining!</b>",
        icon: "success",
        confirmButtonText: "Next Day",
        confirmButtonColor: "var(--christmas-gold)",
        background: "var(--bg-secondary)",
        color: "var(--snow-white)",
        customClass: { popup: 'swal-magical-popup' }
      });

      setRandomTask(tasks[Math.floor(Math.random() * tasks.length)]);

      if (nextDay > 25) setPage("final");
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Generates exact coordinates for a perfect tree pyramid.
   */
  const getStarPosition = (num) => {
    let row, colInRow, starsInRow;

    if (num <= 4) { row = 0; starsInRow = 4; colInRow = num - 1; }
    else if (num <= 10) { row = 1; starsInRow = 6; colInRow = num - 5; }
    else if (num <= 15) { row = 2; starsInRow = 5; colInRow = num - 11; }
    else if (num <= 19) { row = 3; starsInRow = 4; colInRow = num - 16; }
    else if (num <= 22) { row = 4; starsInRow = 3; colInRow = num - 20; }
    else if (num <= 24) { row = 5; starsInRow = 2; colInRow = num - 23; }
    else { row = 6; starsInRow = 1; colInRow = 0; }

    const top = 85 - row * 12.5;
    const left = 50 + (colInRow - (starsInRow - 1) / 2) * 13;

    return { top, left };
  };

  return (
    <div className="daily-task-page">
      {/* ❄️ Snow Layers */}
      <div className="snow-layer layer-1"></div>
      <div className="snow-layer layer-2"></div>

      <div className="content-wrapper">
        <header className="page-header">
          <motion.div
            className="header-glow"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          ></motion.div>
          <h2 className="title">Path to Christmas</h2>
          <div className="progress-pill">
            <Sparkles size={16} fill="gold" />
            <span>Day {day} / 25</span>
          </div>
        </header>

        <div className="main-layout">
          {/* 🌲 Tree Section */}
          <div className="tree-section">
            <div className="tree-glow-bg"></div>

            <div className="tree-container">
              {/* 🔗 Constellation Lines (SVG) */}
              <svg className="tree-connections">
                {Array.from({ length: 24 }).map((_, i) => {
                  const current = getStarPosition(i + 1);
                  const next = getStarPosition(i + 2);
                  const isPathLit = day > (i + 1);
                  return (
                    <motion.line
                      key={`line-${i}`}
                      x1={`${current.left}%`}
                      y1={`${current.top}%`}
                      x2={`${next.left}%`}
                      y2={`${next.top}%`}
                      stroke={isPathLit ? "var(--christmas-gold)" : "rgba(255,255,255,0.1)"}
                      strokeWidth={isPathLit ? "2" : "1"}
                      strokeDasharray={isPathLit ? "none" : "5,5"}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                    />
                  );
                })}
              </svg>

              {/* ⭐ Stars */}
              {Array.from({ length: 25 }).map((_, i) => {
                const starNum = i + 1;
                const isTop = starNum === 25;
                const isLit = day >= starNum;
                const isCurrent = day === starNum;
                const pos = getStarPosition(starNum);

                return (
                  <motion.div
                    key={starNum}
                    className={`tree-star ${isLit ? "lit" : ""} ${isTop ? "top-special" : ""} ${isCurrent ? "current-pulse" : ""}`}
                    style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.03 }}
                  >
                    <div className="star-wrapper">
                      <Star
                        size={isTop ? 48 : 24}
                        className="lucide-star"
                        fill={isLit ? "var(--christmas-gold)" : "rgba(255,255,255,0.05)"}
                        stroke={isLit ? "var(--christmas-gold)" : "rgba(255,255,255,0.3)"}
                        strokeWidth={isLit ? 0 : 1.5}
                      />
                      {isLit && (
                        <motion.div
                          className="star-glow-effect"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                        ></motion.div>
                      )}
                    </div>
                    {!isTop && <span className="star-num">{starNum}</span>}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 🃏 Task Card Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={randomTask}
              className="task-glass-card"
              initial={{ opacity: 0, x: 50, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card-ribbon"></div>

              <div className="task-icon-circle">
                <Gift size={32} color="#fff" />
              </div>

              <h3>Day {day} Mission</h3>
              <p className="task-content">
                "{randomTask}"
              </p>

              <motion.button
                className="complete-btn"
                onClick={completeTask}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px var(--christmas-green-bright)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Complete Mission</span>
                <CheckCircle size={20} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default DailyTask;
