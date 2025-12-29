const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: String,
    orderIndex: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

topicSchema.index({ subject: 1, slug: 1 }, { unique: true });

module.exports = mongoose.model("Topic", topicSchema);
