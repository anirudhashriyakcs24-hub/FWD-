const express = require("express");
const router = express.Router();
const { getVideosByTopic } = require("../controllers/videoController");

// ✅ THIS MUST MATCH YOUR URL
// /api/videos/topic/:topicSlug
router.get("/topic/:topicSlug", getVideosByTopic);

module.exports = router;
