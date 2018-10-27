const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema - how it looks in DB
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

//TODO: salt and hash go here

// Create Model - which maps to the actual collection in the db.
const User = mongoose.model("user", userSchema);

// Export Model
module.exports = User;
