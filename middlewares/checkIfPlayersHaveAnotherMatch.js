// Model
const user = require("../models/user");

const checkIfPlayersHaveAnotherMatch = (req, res, next) => {
  // Returns true or false whether the document exists or not
  const query = {
    $or: [
      {
        "player_1.idUser": req.body.id_User,
        "player_2.idUser": req.body.id_Oponent,
      },
      {
        "player_2.idUser": req.body.id_User,
        "player_1.idUser": req.body.id_Oponent,
      },
    ],
  };
  user.exists(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result) {
        res
          .status(400)
          .json({ msg: "Ya tienes una partida en curso con ese usuario" });
      } else {
        // Users don't have another match between them, proceed
        next();
      }
    }
  });
};

module.exports = checkIfPlayersHaveAnotherMatch;
