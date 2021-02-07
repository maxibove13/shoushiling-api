// Dependencies
const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Config
dotenv.config({ path: "./config/config.env" });

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

// Middlewares

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

// Connect to DB
connectDB();

// Endpoints (Routes)

// Hello World
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
  // console.log(req.protocol);
});

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

// Listen conections
app.listen(port, () => {
  console.log(`API working in port ${port}`);
});
