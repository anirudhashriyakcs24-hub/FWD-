const express = require("express");
const router = express.Router();
const { getQuestionsByTest } = require("../controllers/testQuestionController");

// GET questions for a test
router.get("/test/:testId", getQuestionsByTest);

module.exports = router;
