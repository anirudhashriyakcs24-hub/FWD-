const express = require("express");
const router = express.Router();
const { getTestsByTopic } = require("../controllers/testController");

// ✅ THIS MUST MATCH YOUR URL
// /api/tests/topic/:topicSlug
router.get("/topic/:topicSlug", getTestsByTopic);

module.exports = router;
