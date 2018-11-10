const Sprint = require("../models/sprint");

module.exports = {
  sprints: async (req, res) => {
    const email = req.user.email;
    const sprints = await Sprint.find({ email });
    res.json({ sprints });
  },

  addSprint: async (req, res) => {
    const out = await Sprint.create({
      email: req.user.email,
      start: new Date(),
      end: undefined
    });

    res.json({ saved: out });
  },

  stopSprint: async (req, res) => {
    const email = req.user.email;
    const _id = req.value.body.id;
    const done = new Date();

    const out = await Sprint.findOneAndUpdate({ email, _id }, { end: done });
    res.json({ end: done });
  }
};
