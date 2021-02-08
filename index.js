// Dependencies
const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Config
dotenv.config({ path: "./config/config.env" });

// Controllers
const register = require("./controllers/users/register");
const updatePassword = require("./controllers/users/updatePassword");
const updateName = require("./controllers/users/updateName");
const deleteUser = require("./controllers/users/deleteUser");

// Middlewares
//const logger = require("./middlewares/logger");

// Modules
const connectDB = require("./config/db"); // It enters connectDB module. Modules don't need to reload config files.
//const printEndpoint = require("./")

// Server
const app = express();

// Set port
// PORT is for heroku & PORT_LOCAL for local deployment.
const port = process.env.PORT || process.env.PORT_LOCAL;

// Local Middlewares
const checkIfNameAlreadyTaken = require("./controllers/users/middlewares/checkIfNameAlreadyTaken");
const checkIfEmailAlreadyRegistered = require("./controllers/users/middlewares/checkIfEmailAlreadyRegistered");

// Run morgan if in dev mode
if (process.env.npm_lifecycle_event === "dev") {
  app.use(morgan("dev"));
}
// Midleware for parsing of JSON, convert the body data to json
app.use(express.json());
// Middleware to handle form submissions
// app.use(express.urlencoded({ extended: false}))
// Middleware for using CORS (enables sharing of data between two different DNS, i.e. web and api)
app.use(cors());
// Middleware to display the endpoint in the console
if (process.env.npm_lifecycle_event === "dev") {
  //server.use(logger);
}

// connect to db
connectDB();

// Endpoints (Routes)

// Hello World
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
  // console.log(req.protocol);
});

// Use /users routes
app.use("/users", require("./routes/users"));

// request email & password and respond ok or not.
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email === "maxibove13@gmail.com" && password === "179413") {
    res.status(201).json({
      message: `Succesful login for ${email}`,
    });
  } else {
    res.status(403).json({
      message: "Wrong credentials",
    });
  }
});

// Register a user
app.post(
  "/register",
  checkIfEmailAlreadyRegistered,
  checkIfNameAlreadyTaken,
  register
);

// Update password
app.put("/updatePassword", updatePassword);

// Update name
app.put("/updateName", updateName);

// Delete User
app.delete("/deleteUser", deleteUser);

// Listen conections only if connected or connecting to db.
if (mongoose.connection.readyState) {
  app.listen(port, () => {
    console.log(`API working in port ${port}`);
  });
}
