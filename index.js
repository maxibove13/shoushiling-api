// Dependencies
const express = require("express");
const bodyParser = require("body-parser");

// Server
const server = express();
const port = 5000;

// Midlewares usage
server.use(bodyParser.json());

// Data
const users = [
  {
    id: 1,
    name: "Max",
    email: "maxibove13@gmail.com",
    password: "179413",
  },
  {
    id: 2,
    name: "Bel",
    email: "belenpagliachocho@gmail.com",
    password: "fliapaglia",
  },
];

// Endpoints

server.post("/login", (request, response) => {
  // Add user to database
  const email = request.body.email;
  const password = request.body.password;
  if (email === "maxibove13@gmail.com" && password === "179413") {
    response.status(201).json({
      message: `Succesful login for ${email}`,
    });
  } else {
    response.status(403).json({
      message: "Wrong credentials",
    });
  }
});

// get all users
server.get("/users", (request, response) => {
  response.status(200).json({
    users,
  });
});

server.get("/user/:id", (request, response) => {
  // Connect to database
  // Connect to all users
  // Return in JSON format the user lists
  const result = users.find((user) => {
    return user.id == request.params.id;
  });
  if (result) {
    response.status(200).json({
      result,
    });
  } else {
    response.status(404).json({
      message: "User not found",
    });
  }
});

// Listen conections
server.listen(port, () => {
  console.log(`API working in port ${port}`);
});
