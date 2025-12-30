import { motion } from "framer-motion";
import "../styles/Landing.css";
import { Star, Gift, ArrowRight } from "lucide-react";

function Landing({ setPage }) {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  return (
    <div className="landing">
      {/* Dynamic Background Elements */}
      <div className="bg-gradient-overlay"></div>
      <div className="snow-container">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="snowflake" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }} />
        ))}
      </div>

      {/* Navbar */}
      <motion.header
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="logo-container">
          <Star className="logo-icon" size={32} color="var(--christmas-gold)" fill="var(--christmas-gold)" />
          <h3 className="logo">SantaPath</h3>
        </div>
      </motion.header>

      {/* Main Hero Section */}
      <main className="main-content">
        <motion.div
          className="hero-container"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div className="hero-text" variants={fadeIn}>
            <motion.span
              className="subtitle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Gift size={18} className="gift-icon" />
              THE OFFICIAL NORTH POLE TRACKER
            </motion.span>

            <h1>
              Walk the <span className="highlight-red">SantaPath</span> <br />
              <span className="highlight-gold">& Shine Bright</span>
            </h1>

            <p>
              Join the magical journey this season! Track your good deeds,
              unlock festive rewards, and earn your spot on Santa’s Nice List.
              The magic starts with a single step.
            </p>

            <div className="hero-buttons">
              <motion.button
                className="primary-btn"
                onClick={() => setPage("kid")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Journey <ArrowRight size={20} />
              </motion.button>

              <motion.button
                className="secondary-btn"
                onClick={() => setPage("santa-login")}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Santa Portal
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className="hero-image-container"
            variants={fadeIn}
          >
            <motion.div
              className="glass-card"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop"
                alt="Magical Winter Village"
                className="hero-img"
              />
              <div className="card-decoration">
                <div className="decoration-star"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

export default Landing;
