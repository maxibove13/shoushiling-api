// Models
const match = require("../../models/match");

const matchesByUserId = (req, res) => {
  const query = {
    $or: [
      {
        "player_1.id_user": req.body.id_user,
      },
      {
        "player_2.id_user": req.body.id_user,
      },
    ],
  };

  match.find(query, (err, match) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ msg: "No se logró realizar la consulta a la base de datos" });
    } else {
      res.status(200).send(match);
    }
  });
};

module.exports = matchesByUserId;
