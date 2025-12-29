const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const topicRoutes = require("./routes/topicRoutes");
const videoRoutes = require("./routes/videoRoutes");
const testRoutes = require("./routes/testRoutes");
const testAttemptRoutes = require("./routes/testAttemptRoutes");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/test-questions", require("./routes/testQuestionRoutes"));
app.use("/api/test-attempts", testAttemptRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// global error handler (DEBUG)
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE REJECTION:", err);
});

