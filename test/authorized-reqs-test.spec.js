const assert = require("assert");
const app = require("../app");
const request = require("supertest");

describe("AUTHORIZED REQUESTS", function() {
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

  it("Tasks should return when authorized", function() {
    return request(app)
      .get("/users/tasks")
      .set("Authorization", "jwt " + token)
      .expect(200)
      .then(res => {
        assert.ok(res.body);
      });
  });
});
