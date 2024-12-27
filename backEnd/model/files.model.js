const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  path: {
    type: String,
    required: [true, "Path is required "],
  },
  originName: {
    type: String,
    required: [true, "originalName is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "user is reqiured "],
  },
});

const file = mongoose.model("file", fileSchema);
module.exports = file;
