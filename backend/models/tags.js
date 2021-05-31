const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 32,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tags", tagsSchema);
