import { useState } from "react";
import "../styles/SantaLogin.css";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Shield, Lock, Key, ArrowRight } from "lucide-react";

function SantaLogin({ setPage }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = (e) => {
        e.preventDefault();



        if (
            username.trim().toLowerCase() === "santa" &&
            password.trim() === "santa123"
        ) {

            Swal.fire({
                title: "Access Granted",
                text: "Welcome back, Santa! 🎅",
                icon: "success",
                timer: 1500,
                background: "var(--bg-secondary)",
                color: "var(--snow-white)",
                showConfirmButton: false,
                customClass: { popup: 'swal-magical-popup' }
            }).then(() => {
                setPage("santa"); // Redirect to Dashboard
            });
        } else {
            Swal.fire({
                title: "Access Denied",
                text: "Incorrect credentials! Are you an elf spy? 🧝",
                icon: "error",
                background: "#2a0a0a",
                color: "#ff4d4d",
                confirmButtonColor: "#dc2626",
                customClass: { popup: 'swal-magical-popup' }
            });
        }
    };

    return (
        <div className="santa-login-page">
            <div className="scan-line"></div>

            <motion.div
                className="security-panel"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
            >
                <div className="security-header">
                    <Shield size={56} className="shield-icon" />
                    <h2>North Pole Operations</h2>
                    <h2><span>Authorized Personnel Only</span></h2>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <UserIcon />
                        <input
                            type="text"
                            placeholder="Agent ID"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="secure-input"
                        />
                    </div>

                    <div className="input-group">
                        <Key className="input-icon-left" size={20} />
                        <input
                            type="password"
                            placeholder="Passcode"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="secure-input"
                        />
                    </div>

                    <button type="submit" className="access-btn">
                        AUTHENTICATE <ArrowRight size={20} />
                    </button>
                </form>

                <div className="security-footer">
                    <p>RESTRICTED AREA: CLASS 1 CLEARANCE ONLY</p>
                </div>
            </motion.div>
        </div>
    );
}

// Simple Helper Icon
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon-left">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export default SantaLogin;
