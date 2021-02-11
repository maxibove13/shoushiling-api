// Dependencies
const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

// Models
const match = require("../models/match");

// Controllers
const createMatch = require("../controllers/matches/createMatch");
const queryDB = require("../controllers/matches/queryDB");

// Local middlewares
const verifyToken = require("../middlewares/verifyToken");
const checkIfPlayersHaveAnotherMatch = require("../middlewares/checkIfPlayersHaveAnotherMatch");

// Show all matches
router.get("/", (req, res) => {
  match.find({}, (err, match) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ msg: "No se logró realizar la consulta a la base de datos" });
    } else {
      res.status(200).send(match);
    }
  });
});

// Create a new match in the db
router.post("/", verifyToken, checkIfPlayersHaveAnotherMatch, createMatch);

// Update the match games

// Create a new game in a requested match

router.post("/queries", queryDB);

// VerifyToken -> checkIfPlayersHaveAnotherMatch

module.exports = router;
