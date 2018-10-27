const express = require("express");
const router = require("express-promise-router")();
const UsersController = require("../controllers/users");
const { validateBody, schemas } = require("../helpers/routeHelpers");
const passport = require("passport");

// We don't use this variable but this does cause passport
// to be initialized wth our strategy. TODO: maybe this should
// be in the APP?
//const passportConf =
require("../passport");

router
  .route("/signup")
  .post(validateBody(schemas.authenticationSchema), UsersController.signup);
router.route("/signin").post(UsersController.signin);

// This is the route that's passport protected.
// JWT authentication acts as the gatekeeper to
// UsersController.secret function. Session: false
// seems just like an optimization since we're
// writing an API and there won't be any sessions.
router
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    UsersController.secret
  );

module.exports = router;
