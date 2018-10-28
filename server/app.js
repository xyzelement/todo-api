const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/TODO",
  { useNewUrlParser: true }
);

const app = express();

// Middleware

app.use(bodyParser.json());

// Routes
app.use("/users", require("./routes/users"));

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.use(morgan("dev")); // Only log not in unit tests :)
  app.listen(port);
  console.log(`Server listening on ${port}`);
}

module.exports = app;
