const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const taskRoute = require("./routes/task");

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

// ✅ CORS CONFIG
app.use(cors({
  origin: "https://tassk-1.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", taskRoute);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// SPA fallback
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
