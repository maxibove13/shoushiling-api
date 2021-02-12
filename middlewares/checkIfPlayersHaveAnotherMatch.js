// Model
const match = require("../models/match");

const checkIfPlayersHaveAnotherMatch = (req, res, next) => {
  const query = {
    $or: [
      {
        "player_1.id_user": req.body.player_1.id_user,
        "player_2.id_user": req.body.player_2.id_user,
      },
      {
        "player_2.id_user": req.body.player_1.id_user,
        "player_1.id_user": req.body.player_2.id_user,
      },
    ],
  };
  // Returns true or false whether the document exists or not
  match.exists(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result) {
        res.status(400).json({
          msg: "Ya tienes una partida en curso con ese usuario",
        });
      } else {
        // Users don't have another match between them, proceed
        next();
      }
    }
  });
};

module.exports = checkIfPlayersHaveAnotherMatch;
