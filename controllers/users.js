module.exports = {
  signup: async (req, res, next) => {
    console.log("UsersCountroller: signup", req.value.body);
  },

  signin: async (req, res, next) => {
    console.log("UsersCountroller: signin");
  },

  secret: async (req, res, next) => {
    console.log("UsersCountroller: secret");
  }
};
