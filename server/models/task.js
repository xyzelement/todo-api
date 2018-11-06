const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  // TODO: later, use user ID not email
  email: { type: String, required: true, lowercase: true },
  action: { type: String, required: true },
  star: { type: Boolean, required: true, default: false },
  done: { type: Boolean, required: true, default: false },
  context: [{ type: String, required: true }],
  status: { type: String, required: true, default: "inbox" }
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
