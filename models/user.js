const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

//This is going to be called before a save so we can
//hash the password rather than saving plain text
userSchema.pre("save", async function(next) {
  // Not using fat arrow function because 'this' needs to
  // refer to the parent 'this' object. But fat arrow would
  // modify 'this' to the closest lexically scoped one.
  try {
    //generate a salt and hash the password using it
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// compare password hashes
userSchema.methods.checkPassword = async function(passwordToCheck) {
  try {
    return await bcrypt.compare(passwordToCheck, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create Model - which maps to the actual collection in the db.
const User = mongoose.model("user", userSchema);

// Export Model
module.exports = User;
