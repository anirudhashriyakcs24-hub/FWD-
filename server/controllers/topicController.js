const Subject = require("../models/Subject");
const Topic = require("../models/Topic");

exports.getTopicsBySubject = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1️⃣ Find subject
    const subject = await Subject.findOne({ slug });
    if (!subject) return res.json([]);

    // 2️⃣ Find topics using subject _id
    const topics = await Topic.find({ subject: subject._id })
      .sort({ orderIndex: 1 });

    res.json(topics);
  } catch (err) {
    console.error("TOPIC FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to load topics" });
  }
};
