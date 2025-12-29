const Topic = require("../models/Topic");
const Test = require("../models/Test");

// GET tests by topic slug
exports.getTestsByTopic = async (req, res) => {
  try {
    const { topicSlug } = req.params;

    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      return res.json([]);
    }

    const tests = await Test.find({ topic: topic._id });
    res.json(tests);
  } catch (err) {
    console.error("TEST FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to load tests" });
  }
};
