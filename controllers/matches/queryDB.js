// Models
const match = require("../../models/match");

const queryDB = (req, res) => {
  query = {
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

  match.find(query, (err, match) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "Couldn't make the query" });
    } else {
      if (match.length > 0) {
        res.send(match);
      } else {
        res
          .status(500)
          .json({ msg: "No se encontró la partida asociada con la consulta" });
      }
    }
  });
};

module.exports = queryDB;
