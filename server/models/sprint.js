const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sprintSchema = new Schema({
  // TODO: later, use user ID not email
  email: { type: String, required: true, lowercase: true },
  start: { type: Date, default: Date.now },
  end: { type: Date, default: undefined }
});

const Sprint = mongoose.model("sprint", sprintSchema);

module.exports = Sprint;
