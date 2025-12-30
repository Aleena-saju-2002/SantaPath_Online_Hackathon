const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MongoDB URI
const MONGO_URI = "mongodb://127.0.0.1:27017/santaDB";

// 🔹 MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));

// 🔹 Kid Schema
const kidSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // dob: String,
  wish: String,
  day: { type: Number, default: 1 },
  tasksCompleted: { type: [Number], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const Kid = mongoose.model("Kid", kidSchema);

// 🔹 Create or Get Kid
app.post("/api/kid/start", async (req, res) => {
  const { name, age, dob } = req.body;

  let kid = await Kid.findOne({ name, age, dob });

  if (!kid) {
    kid = new Kid({ name, age, dob });
    await kid.save();
  }

  res.json(kid);
});

// 🔹 Save Wish
app.post("/api/kid/wish", async (req, res) => {
  const { kidId, wish } = req.body;

  const kid = await Kid.findByIdAndUpdate(
    kidId,
    { wish },
    { new: true }
  );

  res.json(kid);
});

// 🔹 Complete Daily Task
app.post("/api/kid/task", async (req, res) => {
  const { kidId } = req.body;

  const kid = await Kid.findById(kidId);
  if (!kid) return res.status(404).json({ message: "Kid not found" });

  kid.day += 1;
  await kid.save();

  res.json(kid);
});

// 🔹 Get All Kids (Santa Dashboard)
app.get("/api/kids", async (req, res) => {
  const kids = await Kid.find().sort({ day: -1 });
  res.json(kids);
});

// 🔹 Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
