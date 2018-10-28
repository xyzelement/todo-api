const assert = require("assert");
const app = require("../app");
const request = require("supertest");
var faker = require("faker");

describe("UNAUTHORIZED REQUESTS", function() {
  it("Signin should NOT get token back with invalid user", function(done) {
    request(app)
      .post("/users/signin")
      .send({ email: "noted@ed.com", password: "ed" })
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.status, 401);
        assert.ok(!res.body.token);
        done();
      });
  });

  it("Tasks should fail without authentication", function() {
    return request(app)
      .get("/users/tasks")
      .expect(401)
      .then(res => {
        assert.ok(res.body);
      });
  });

  it("Signin should get token back with valid user", function(done) {
    request(app)
      .post("/users/signin")
      .send({ email: "ed@ed.com", password: "ed" })
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.status, 200);
        assert.ok(res.body.token);
        done();
      });
  });

  it("Signup should fail with dupe user", function(done) {
    request(app)
      .post("/users/signup")
      .send({ email: "ed@ed.com", password: "ed" })
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.status, 403);
        assert.ok(res.body.error);
        assert.ok(!res.body.toke);
        done();
      });
  });

  //TODO this should use a totally fake database...
  it("Signup should succeed for new user", function(done) {
    request(app)
      .post("/users/signup")
      .send({ email: faker.internet.email(), password: "ed" })
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.status, 200);
        assert.ok(!res.body.error);
        assert.ok(res.body.token);
        done();
      });
  });
});
