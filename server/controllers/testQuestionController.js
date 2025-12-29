const TestQuestion = require("../models/TestQuestion");

exports.getQuestionsByTest = async (req, res) => {
  try {
    const { testId } = req.params;

    const questions = await TestQuestion.find({ test: testId })
      .sort({ orderIndex: 1 });

    res.json(questions);
  } catch (error) {
    console.error("TEST QUESTION ERROR:", error);
    res.status(500).json({ message: "Failed to load test questions" });
  }
};
