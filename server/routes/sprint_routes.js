//require("../passport");
const passport = require("passport");
const { validateBody, schemas } = require("./routeHelpers");
const router = require("express-promise-router")();
const authenticateWithJwt = passport.authenticate("jwt", { session: false });

const SprintController = require("../controllers/sprint_controller");

router
  .route("/")
  .get(authenticateWithJwt, SprintController.sprints)
  .post(
    validateBody(schemas.sprintAddSchema),
    authenticateWithJwt,
    SprintController.addSprint
  )
  .put(
    validateBody(schemas.sprintStopSchema),
    authenticateWithJwt,
    SprintController.stopSprint
  );

module.exports = router;
