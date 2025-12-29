const mongoose = require("mongoose");

const TestQuestionSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true
    },
    question: {
      type: String,
      required: true
    },
    optionA: {
      type: String,
      required: true
    },
    optionB: {
      type: String,
      required: true
    },
    optionC: {
      type: String,
      required: true
    },
    optionD: {
      type: String,
      required: true
    },
    correctOption: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required: true
    },
    marks: {
      type: Number,
      default: 1
    },
    orderIndex: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestQuestion", TestQuestionSchema);
