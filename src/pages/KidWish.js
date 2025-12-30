import { useState } from "react";
import "../styles/KidWish.css";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";
import { Gift, Send } from "lucide-react";
import confetti from "canvas-confetti";

function KidWish({ setPage }) {
  const [wish, setWish] = useState("");

  const saveWish = async () => {
    if (!wish.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Ho ho ho!",
        text: "Don't forget to write your wish! 🎄",
        background: "var(--bg-secondary)",
        color: "var(--snow-white)",
        confirmButtonColor: "var(--christmas-red)",
        customClass: { popup: 'swal-magical-popup' }
      });
      return;
    }

    // 🎉 Colorful Pop Effect
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#C41E3A', '#FFFFFF', '#0f3d26']
    });

    const kidId = localStorage.getItem("kidId");

    try {
      if (kidId) {
        axios.post("http://localhost:5000/api/kid/wish", {
          kidId,
          wish: wish.trim(),
        }).catch(err => console.log("Offline save"));
      }

      await Swal.fire({
        title: "Wish Sent!",
        text: "Santa's elves are filing it right now! 📨",
        icon: "success",
        background: "var(--bg-secondary)",
        color: "var(--snow-white)",
        confirmButtonColor: "var(--christmas-green)",
        customClass: { popup: 'swal-magical-popup' }
      });

      localStorage.setItem("wish", wish.trim());
      localStorage.setItem("day", 1);
      setPage("task");
    } catch (error) {
      console.error(error);
      setPage("task");
    }
  };

  return (
    <div className="kid-wish-page">
      {/* ❄️ Snow Layers */}
      <div className="snow-layer layer-1"></div>

      <div className="center-container">
        <motion.div
          className="wish-glass-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <div className="header-icon-float">
            <Gift size={50} color="var(--christmas-gold)" />
          </div>

          <h2>Make a Wish</h2>
          <p className="wish-instruction">
            Tell Santa what you're dreaming of...
          </p>

          <textarea
            className="magical-textarea"
            placeholder="Dear Santa..."
            value={wish}
            onChange={(e) => setWish(e.target.value)}
          />

          <div className="action-buttons">
            <motion.button
              onClick={saveWish}
              className="send-wish-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send to North Pole <Send size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default KidWish;
