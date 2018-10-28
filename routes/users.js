const express = require("express");
const router = require("express-promise-router")();
const UsersController = require("../controllers/users");
const { validateBody, schemas } = require("./routeHelpers");
const passport = require("passport");

// We don't use this variable but this does cause passport
// to be initialized wth our strategy. TODO: maybe this should
// be in the APP?
//const passportConf =
require("../passport");

const authenticateWithJwt = passport.authenticate("jwt", { session: false });

router
  .route("/signup")
  .post(validateBody(schemas.authenticationSchema), UsersController.signup);

// for Signin, first we validateBody to confirm we've got the
// email and password fields. Then we authenticate against the
// local DB and finally call controller.signin
router
  .route("/signin")
  .post(
    validateBody(schemas.authenticationSchema),
    passport.authenticate("local", { session: false }),
    UsersController.signin
  );

// This is the route that's passport protected.
// JWT authentication acts as the gatekeeper to
// UsersController.secret function. Session: false
// seems just like an optimization since we're
// writing an API and there won't be any sessions.
router.route("/secret").get(authenticateWithJwt, UsersController.secret);

//TODO: this should be in a TASK routes
router.route("/tasks").get(authenticateWithJwt, UsersController.tasks);

router
  .route("/task")
  .post(
    validateBody(schemas.taskAddSchema),
    authenticateWithJwt,
    UsersController.addTask
  )
  .delete(
    validateBody(schemas.taskDeleteSchema),
    authenticateWithJwt,
    UsersController.deleteTask
  )
  .put(
    validateBody(schemas.taskUpdateSchema),
    authenticateWithJwt,
    UsersController.updateTask
  );

module.exports = router;
