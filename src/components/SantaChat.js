import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Music, Sparkles } from "lucide-react";
import "../styles/SantaChat.css";

const SANTA_RESPONSES = {
    default: [
        "Ho Ho Ho! I'm listening! 🎅",
        "That sounds magical!",
        "I'm checking my list... yep, you're doing great!",
        "Tell me more, my little friend!",
        "The elves are working hard today!"
    ],
    sing: [
        "🎵 Jingle bells, jingle bells, jingle all the way! 🎵",
        "🎵 Silent night, holy night... all is calm, all is bright. 🎵",
        "🎵 Rudolph the red-nosed reindeer, had a very shiny nose! 🎵"
    ],
    joke: [
        "What do you call a snowman with a six-pack? An abdominal snowman! 😂",
        "Why does Santa go down the chimney? Because it soots him! 🎅",
        "What do elves learn in school? The Elf-abet! 📝"
    ],
    hello: [
        "Hello there! Have you been good this year? 🎄",
        "Merry Christmas! I see you!"
    ]
};

function SantaChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: "santa", text: "Ho Ho Ho! Need a friend? Ask me to 'sing a song' or 'tell a joke'! 🎅" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        // User Message
        const userMsg = { id: Date.now(), sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);

        const lowerInput = input.toLowerCase();
        setInput("");

        // Simulate Santa Response
        setTimeout(() => {
            let replyText = "";
            let type = "text";

            // 🧠 Simple Logic
            if (lowerInput.includes("sing") || lowerInput.includes("song")) {
                replyText = SANTA_RESPONSES.sing[Math.floor(Math.random() * SANTA_RESPONSES.sing.length)];
                type = "song";
            } else if (lowerInput.includes("joke") || lowerInput.includes("funny")) {
                replyText = SANTA_RESPONSES.joke[Math.floor(Math.random() * SANTA_RESPONSES.joke.length)];
            } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
                replyText = SANTA_RESPONSES.hello[Math.floor(Math.random() * SANTA_RESPONSES.hello.length)];
            } else {
                replyText = SANTA_RESPONSES.default[Math.floor(Math.random() * SANTA_RESPONSES.default.length)];
            }

            const santaMsg = { id: Date.now() + 1, sender: "santa", text: replyText, type };
            setMessages((prev) => [...prev, santaMsg]);
        }, 1000);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSend();
    };

    const quickAction = (action) => {
        setInput(action);
        // Auto send for quick actions is optional, but let's just populate input for user to confirm or auto-call handleSend if preferred.
        // Let's auto-send for better UX
        setTimeout(() => {
            // Need to duplicate logic or structure differently to avoid state clash, 
            // effectively mostly just calling handleSend with the value
            // But since state update is async, best is to just set it and let user press enter OR pass text directly.
            // Let's pass text logic directly.
        }, 100);
        // Simplified: Just set input, user clicks send or we call internal helper. 
        // Let's stick to setInput for now to let them see it.
    };

    return (
        <div className="santa-chat-widget">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chat-window"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    >
                        <div className="chat-header">
                            <span>Chat with Santa 🎅</span>
                            <button className="close-chat" onClick={() => setIsOpen(false)}><X size={18} /></button>
                        </div>

                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    {msg.text}
                                    {msg.type === "song" && <div className="scrolling-lyrics">🎵 Sound on! 🎵</div>}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div style={{ padding: '0 10px' }}>
                            <div className="quick-actions">
                                <span className="action-pill" onClick={() => setInput("Sing a song")}>🎤 Sing Song</span>
                                <span className="action-pill" onClick={() => setInput("Tell a joke")}>😂 Joke</span>
                                <span className="action-pill" onClick={() => setInput("Am I on nice list?")}>📜 Nice List?</span>
                            </div>
                        </div>

                        <div className="chat-input-area">
                            <input
                                className="chat-input"
                                placeholder="Ask Santa something..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button className="send-chat-btn" onClick={handleSend}>
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="santa-head-btn"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <MessageSquare size={32} color="white" fill="white" />
            </motion.button>
        </div>
    );
}

export default SantaChat;
