import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/SantaDashboard.css";
import { User, Gift, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

function SantaDashboard() {
  const [kids, setKids] = useState([]);

  useEffect(() => {
    fetchKids();
  }, []);

  const fetchKids = async () => {
    try {
      // Mock data/check for backend
      // check if backend is reachable? 
      // For now, assuming backend is there or using dummy data if fails
      const res = await axios.get("http://localhost:5000/api/kids");
      setKids(res.data);
    } catch (error) {
      console.error(error);
      // Fallback for visual demo
      setKids([
        { _id: '1', name: 'Timmy', age: 7, day: 5, wish: 'A red bicycle' },
        { _id: '2', name: 'Sally', age: 9, day: 26, wish: 'A puppy' }
      ]);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>🎅 Santa's Official List</h1>
        <p>Monitoring the Nice List from the North Pole</p>
      </div>

      <div className="stats-container">
        {kids.length === 0 && (
          <p className="no-kids-msg">
            No kids joined yet 🎄
          </p>
        )}

        {kids.map((kid) => {
          const progress = Math.min(
            Math.round(((kid.day - 1) / 25) * 100),
            100
          );

          const isCompleted = kid.day > 25;

          return (
            <motion.div
              className="kid-report-card"
              key={kid._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card-top">
                <span
                  className={`status-badge ${isCompleted ? "complete" : "in-progress"
                    }`}
                >
                  {isCompleted ? (
                    <><CheckCircle size={14} /> Completed</>
                  ) : (
                    <><Clock size={14} /> In Progress</>
                  )}
                </span>

                <span className="age-tag">Age: {kid.age}</span>
              </div>

              <div className="kid-info">
                <User size={40} className="kid-avatar" />
                <h2 className="kid-name">{kid.name}</h2>
              </div>

              <div className="wish-section">
                <div className="wish-header">
                  <Gift size={16} /> <label>Christmas Wish</label>
                </div>
                <p className="wish-text">
                  "{kid.wish || "No wish sent yet"}"
                </p>
              </div>

              <div className="progress-section">
                <div className="progress-info">
                  <span>SantaPath Progress</span>
                  <span>{progress}%</span>
                </div>

                <div className="progress-bar-bg">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                </div>

                <p className="day-count">Day {kid.day} of 25</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default SantaDashboard;
