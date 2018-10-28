// You don't 'require' mocha. it uses globals. Reduced boiler plate.
// Suite - a way to organize tests

const assert = require("assert");
const routeHelpers = require("../routes/routeHelpers");

describe("routeHelpers: testing this middleware", function() {
  // Tests go here
  // Will use Node's assert. One assertion per test ideally

  it("validateBody (taskAddSchema) should add value.body to the req parameter", function() {
    const req = { body: { action: "Parse this properly!" } };
    const func = routeHelpers.validateBody(routeHelpers.schemas.taskAddSchema);
    func(req, null, () => {});

    assert.ok(req.value.body);
  });
});
