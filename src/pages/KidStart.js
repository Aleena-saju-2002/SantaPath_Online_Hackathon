import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import "../styles/KidStart.css";
import axios from "axios";
import { User, Star, Sparkles } from "lucide-react";

function KidStart({ setPage }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const start = async () => {
    const trimmedName = name.trim();
    const numAge = Number(age);

    // 🔹 Basic validation
    if (!trimmedName || !age) {
      Swal.fire({
        icon: "warning",
        title: "Ho Ho Ho!",
        text: "Santa needs your name and age! 🎅",
        background: "var(--bg-secondary)",
        color: "var(--snow-white)",
        confirmButtonColor: "var(--christmas-red)",
        customClass: { popup: 'swal-magical-popup' }
      });
      return;
    }

    // 🔹 Age validation
    if (numAge < 3 || numAge > 100) {
      Swal.fire({
        icon: "info",
        title: "Are you sure?",
        text: "This magic is for kids (and kids at heart) between 3 and 100! 🎄",
        background: "var(--bg-secondary)",
        color: "var(--snow-white)",
        confirmButtonColor: "var(--christmas-gold)",
        customClass: { popup: 'swal-magical-popup' }
      });
      return;
    }

    try {
      // 🔹 API call (simulate success if offline)
      try {
        const res = await axios.post("http://localhost:5000/api/kid/start", {
          name: trimmedName,
          age: numAge,
        });
        localStorage.setItem("kidId", res.data._id);
      } catch (e) {
        console.log("Offline mode or backend error, proceeding locally");
      }

      localStorage.setItem("kidName", trimmedName);
      setPage("wish");

    } catch (err) {
      console.error(err);
      localStorage.setItem("kidName", trimmedName);
      setPage("wish");
    }
  };

  return (
    <div className="kid-start-page">
      {/* ❄️ Magical Snow Background */}
      <div className="snow-layer layer-1"></div>
      <div className="snow-layer layer-2"></div>

      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <div className="card-decoration">
          <Star className="deco-star top-left-star" size={32} fill="var(--christmas-gold)" />
          <Star className="deco-star top-right-star" size={24} fill="var(--christmas-gold)" />
        </div>

        <div className="header-section">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Sparkles size={48} className="title-icon" />
          </motion.div>
          <h2>Welcome to the<br /><span className="highlight-text">North Pole</span></h2>
        </div>

        <p className="subtitle">Enter your details so Santa can find you!</p>

        <div className="input-container">
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="text"
              placeholder="What is your name?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="magical-input"
            />
          </div>

          <div className="input-group">
            <span className="input-icon text-icon">#</span>
            <input
              type="number"
              placeholder="How old are you?"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="magical-input"
            />
          </div>
        </div>

        <motion.button
          onClick={start}
          className="magical-btn"
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px var(--christmas-red-glow)" }}
          whileTap={{ scale: 0.95 }}
        >
          Start the Magic ✨
        </motion.button>

      </motion.div>
    </div>
  );
}

export default KidStart;
