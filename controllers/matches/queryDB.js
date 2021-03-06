// Models
const match = require("../../models/match");

const queryDB = (req, res) => {
  const query = {
    $and: [
      {
        $or: [
          {
            $and: [
              {
                "player_1.id_user": req.body.player_1.id_user,
              },
              {
                "player_2.id_user": req.body.player_2.id_user,
              },
              {
                $or: [
                  {
                    state: "waitingApproval",
                  },
                  {
                    state: "playing",
                  },
                ],
              },
            ],
          },
          {
            $and: [
              {
                "player_1.id_user": req.body.player_2.id_user,
              },
              {
                "player_2.id_user": req.body.player_1.id_user,
              },
              {
                $or: [
                  {
                    state: "waitingApproval",
                  },
                  {
                    state: "playing",
                  },
                ],
              },
            ],
          },
        ],
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
        res.status(500).json({ msg: "No se encontró la partida asociada con la consulta" });
      }
    }
  });
};

module.exports = queryDB;
