// Dependencies
const express = require("express");
const router = express.Router();

// Controllers
const register = require("../controllers/users/register");

// Hard coded data
const dataImport = require("../data.json");

// respond a list of users
router.get("/", (req, res) => {
  res.status(200).send(dataImport);
});

// request id in URL and respond corresponding user
router.get("/:id", (req, res) => {
  // Return in JSON format the user lists
  const result = dataImport.find((user) => {
    return user.id === parseInt(req.params.id);
  });
  if (result) {
    res.status(200).json({
      result,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

// Register a user
router.post("/", register);

module.exports = router;
