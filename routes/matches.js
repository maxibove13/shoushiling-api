// Dependencies
const express = require("express");
const router = express.Router();

// Models
const match = require("../models/match");

// Controllers
const createMatch = require("../controllers/matches/createMatch");
const queryDB = require("../controllers/matches/queryDB");
const pushNewGame = require("../controllers/matches/pushNewGame");
const updateMatch = require("../controllers/matches/updateMatch");
const rejectMatch = require("../controllers/matches/rejectMatch");
const matchesByUserId = require("../controllers/matches/matchesByUserId");

// Local middlewares
const verifyToken = require("../middlewares/verifyToken");
const checkIfPlayersHaveAnotherMatch = require("../middlewares/checkIfPlayersHaveAnotherMatch");
const checkUsersAreNotTheSame = require("../middlewares/checkUsersAreNotTheSame");

// Show all matches
router.get("/", (req, res) => {
  match.find({}, (err, match) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "No se logró realizar la consulta a la base de datos" });
    } else {
      res.status(200).send(match);
    }
  });
});

// Show all matches associated with a given user
router.post("/byUserId", verifyToken, matchesByUserId);

// Create a new match in the db
router.post(
  "/",
  verifyToken,
  checkUsersAreNotTheSame,
  checkIfPlayersHaveAnotherMatch,
  createMatch
);

// Push a new game. Only player_1 does it.
router.put("/pushNewGame", verifyToken, pushNewGame);

// update match state, points, movePlayer_2 and wonBy inside games. Only player_2 fetchs it.
router.put("/updateMatch", verifyToken, updateMatch);

// update match state, points, movePlayer_2 and wonBy inside games. Only player_2 fetchs it.
router.put("/rejectMatch", verifyToken, rejectMatch);

// Create a new game in a requested match

router.post("/queries", queryDB);

module.exports = router;
