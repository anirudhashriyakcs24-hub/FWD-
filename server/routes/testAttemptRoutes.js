const express = require("express");
const router = express.Router();
const {
  createAttempt,
  getMyAttempts
} = require("../controllers/testAttemptController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createAttempt);
router.get("/me", authMiddleware, getMyAttempts);

module.exports = router;
