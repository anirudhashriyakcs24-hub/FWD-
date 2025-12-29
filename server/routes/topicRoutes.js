const express = require("express");
const router = express.Router();
const { getTopicsBySubject } = require("../controllers/topicController");

router.get("/subject/:slug", getTopicsBySubject);

module.exports = router;
