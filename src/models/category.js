const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: string,
    },
  },
  {
    timeseries: true,
  }
);
module.exports = mongoose.model("Category", categorySchema);
