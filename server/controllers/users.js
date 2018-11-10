const JWT = require("jsonwebtoken");
const User = require("../models/user");
const Task = require("../models/task");
const Sprint = require("../models/sprint");
const config = require("../configuration");

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

  signin: async (req, res, next) => {
    // So if we got this far, we expect that there's a req.user
    // that corresponds to the user model object we returned in
    // passport-local on success. Ie, the following line only
    // works if we expect the passport-local strategy to have
    // executed before.
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  //TODO: this should be in the Tasks controller
  tasks: async (req, res, next) => {
    const email = req.user.email;
    const tasks = await Task.find({ email });
    res.json({ tasks });
  },

  sprints: async (req, res, next) => {
    const email = req.user.email;
    const sprints = await Sprint.find({ email });
    res.json({ sprints });
  },

  addSprint: async (req, res, next) => {
    const newSprint = new Sprint({
      email: req.user.email,
      start: Date(),
      end: undefined
    });
    await newSprint.save();
    res.json({ saved: newSprint });
  },

  stopSprint: async (req, res, next) => {
    const email = req.user.email;
    const _id = req.value.body.id;
    const done = Date();
    //TODO: error checking?
    const result = await Sprint.updateOne({ email, _id }, { end: done });
    return res.json({ end: done, result });
  },

  //TODO: this should also be in the Tasks controller
  addTask: async (req, res, next) => {
    const email = req.user.email;
    const action = req.value.body.action;
    const star = req.value.body.star;
    const done = req.value.body.done;
    const context = req.value.body.context;
    const hist = [{ on: new Date(), what: action }];
    const newTask = new Task({ email, action, star, done, context, hist });
    await newTask.save();
    res.json({ saved: newTask });
  },

  deleteTask: async (req, res, next) => {
    const email = req.user.email;
    const _id = req.value.body.id;

    const result = await Task.deleteOne({ email, _id });
    return res.json({ success: result });
  },

  updateTask: async (req, res, next) => {
    const email = req.user.email;
    const _id = req.value.body.id;

    const update = {};
    if (req.value.body.action !== undefined) {
      update.action = req.value.body.action;
    }
    if (req.value.body.star !== undefined) {
      update.star = req.value.body.star;
    }
    if (req.value.body.done !== undefined) {
      update.done = req.value.body.done;
    }
    if (req.value.body.context !== undefined) {
      update.context = req.value.body.context;
    }
    if (req.value.body.status !== undefined) {
      update.status = req.value.body.status;
    }

    const hist = [{ on: new Date(), what: { ...update } }];

    update.$push = { hist };

    const result = await Task.updateOne({ email, _id }, update);
    return res.json({ success: result.nModified });
  }
};
