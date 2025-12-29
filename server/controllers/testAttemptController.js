const TestAttempt = require("../models/TestAttempt");

exports.createAttempt = async (req, res) => {
  try {
    const { testId, score, totalMarks } = req.body;

    const attempt = await TestAttempt.create({
      user: req.user.id,
      test: testId,
      score,
      totalMarks
    });

    res.status(201).json(attempt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save attempt" });
  }
};
exports.getMyAttempts = async (req, res) => {
  try {
    const attempts = await TestAttempt.find({ user: req.user.id })
      .populate("test", "title")
      .sort({ createdAt: -1 });

    const formatted = attempts.map(a => ({
      _id: a._id,
      testTitle: a.test?.title || "Practice Test",
      score: a.score,
      totalMarks: a.totalMarks,
      createdAt: a.createdAt
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load attempts" });
  }
};
