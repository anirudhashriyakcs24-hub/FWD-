const Topic = require("../models/Topic");
const Video = require("../models/Video");

exports.getVideosByTopic = async (req, res) => {
  try {
    const { topicSlug } = req.params;

    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      return res.json([]);
    }

    const videos = await Video.find({ topic: topic._id })
      .sort({ orderIndex: 1 });

    res.json(videos);
  } catch (err) {
    console.error("VIDEO FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to load videos" });
  }
};
