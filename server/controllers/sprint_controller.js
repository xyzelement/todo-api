const Sprint = require("../models/sprint");

module.exports = {
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
  }
};
