const assert = require("assert");
const app = require("../app");
const request = require("supertest");

describe("AUTHORIZED REQUESTS", function() {
  // Make sure we have a token for the rest of this stuff.
  var token = null;
  before(function(done) {
    request(app)
      .post("/users/signin")
      .send({ email: "ed@ed.com", password: "ed" })
      .end(function(err, res) {
        token = res.body.token;
        done();
      });
  });

  // Make sure we have a task id for some of this stuff.
  var task_id = null;
  before(function(done) {
    request(app)
      .post("/users/task")
      .set("Authorization", "jwt " + token)
      .send({ action: "task for all other stuff", context: ["Test"] })
      .expect(200)
      .then(res => {
        task_id = res.body.saved._id;
        done();
      });
  });

  it("Tasks should return when authorized", function() {
    return request(app)
      .get("/users/tasks")
      .set("Authorization", "jwt " + token)
      .expect(200)
      .then(res => {
        assert.ok(res.body);
      });
  });

  it("Should add task with default star and done", function() {
    return request(app)
      .post("/users/task")
      .set("Authorization", "jwt " + token)
      .send({ action: "Adding this task", context: ["Test"] })
      .expect(200)
      .then(res => {
        assert.strictEqual(res.body.saved.action, "Adding this task");
        assert.strictEqual(res.body.saved.done, false);
        assert.strictEqual(res.body.saved.star, false);
      });
  });

  it("Should update task by id", function() {
    return request(app)
      .put("/users/task")
      .set("Authorization", "jwt " + token)
      .send({ id: task_id, action: "updated action" })
      .expect(200)
      .then(res => {
        console.log(res.body);
        assert.strictEqual(res.body.success, 1);
      });
  });

  it("Should delete task by id", function() {
    return request(app)
      .delete("/users/task")
      .set("Authorization", "jwt " + token)
      .send({ id: task_id })
      .expect(200)
      .then(res => {
        assert.strictEqual(res.body.success.n, 1);
        assert.strictEqual(res.body.success.ok, 1);
      });
  });
});
