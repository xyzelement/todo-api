const express = require("express");
const router = require("express-promise-router")();
const UsersController = require("../controllers/users");

router.route("/signup").post(UsersController.signup);
router.route("/signin").post(UsersController.signin);
router.route("/secret").get(UsersController.secret);

module.exports = router;
