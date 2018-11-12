var sinon = require("sinon");
var sinonTest = require("sinon-test");
var test = sinonTest(sinon);
var mongoose = require("mongoose");
const assert = require("assert");

// https://www.techighness.com/post/unit-testing-expressjs-controller-part-1/

require("sinon-mongoose");

mongoose.Collection.prototype.save = function(docs, options, callback) {
  // this is what the API would do if the save succeeds!
  callback(null, docs);
};

var Sprint = require("../models/sprint");
const Controller = require("../controllers/sprint_controller");

describe("Sprints Controller", function() {
  beforeEach(function() {
    res = {
      json: sinon.spy()
    };
  });

  it(
    "Should get list of sprints",
    test(async function() {
      this.stub(Sprint, "find").returns(["sprint1", "sprint2"]);
      await Controller.sprints({ user: { email: "abc" } }, res);
      sinon.assert.calledWith(Sprint.find, { email: "abc" });
      sinon.assert.calledWith(res.json, { sprints: ["sprint1", "sprint2"] }); //, sinon.match.array);
    })
  );

  it(
    "Should create a sprint with a start and no end time",
    test(async function() {
      this.stub(Sprint, "create");
      await Controller.addSprint({ user: { email: "abc" } }, res);
      sinon.assert.calledWith(Sprint.create, {
        email: "abc",
        end: undefined,
        start: sinon.match.any
      });
    })
  );

  it(
    "Should end a sprint by applying an end time",
    test(async function() {
      this.stub(Sprint, "findOneAndUpdate");
      await Controller.stopSprint(
        { user: { email: "abc" }, value: { body: { id: "12345" } } },
        res
      );
      sinon.assert.calledWith(
        Sprint.findOneAndUpdate,
        {
          email: "abc",
          _id: "12345"
        },
        { end: sinon.match.truthy }
      );
    })
  );
});
