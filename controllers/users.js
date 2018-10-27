const User = require("../models/user");

module.exports = {
  signup: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check for dupe
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).json({ error: "email is already in use" });
    }

    // Create new user
    const newUser = new User({ email, password });
    await newUser.save();

    // TODO Respond with token
    res.json({ users: "created" });
  },

  signin: async (req, res, next) => {},

  secret: async (req, res, next) => {
    console.log("UsersCountroller: secret");
  }
};
