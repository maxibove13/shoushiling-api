// Dependencies
const express = require("express");
const router = express.Router();

// Models
const match = require("../models/match");

// Controllers
const createMatch = require("../controllers/matches/createMatch");
const queryDB = require("../controllers/matches/queryDB");
const updateMatch = require("../controllers/matches/updateMatch");

// Local middlewares
const verifyToken = require("../middlewares/verifyToken");
const checkIfPlayersHaveAnotherMatch = require("../middlewares/checkIfPlayersHaveAnotherMatch");
const checkUsersAreNotTheSame = require("../middlewares/checkUsersAreNotTheSame");

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
router.post(
  "/",
  verifyToken,
  checkUsersAreNotTheSame,
  checkIfPlayersHaveAnotherMatch,
  createMatch
);

// Update the match games
router.put("/", verifyToken, updateMatch);

// Create a new game in a requested match

router.post("/queries", queryDB);

module.exports = router;
