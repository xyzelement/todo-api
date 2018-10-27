const JWT = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../configuration");

module.exports = {
  signup: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check for dupes
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).json({ error: "email is already in use" });
    }

    // Create new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Respond with token
    const token = signToken(newUser);

    res.status(200).json({ token });
  },

  signin: async (req, res, next) => {},

  secret: async (req, res, next) => {
    console.log("UsersCountroller: secret");
  }
};

function signToken(user) {
  //This encodes but does not encrypt - so we can
  //read it later and veirfy it came from us
  return JWT.sign(
    {
      iss: "TODO API",
      sub: user.email,
      iat: new Date().getTime(),
      exp: new Date().setTime(new Date().getTime() + 1) //Expires in one day
    },
    config.JWT_SECRET
  );
}
