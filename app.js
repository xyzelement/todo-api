const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/users", require("./routes/users"));

// Start Server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening on ${port}`);
