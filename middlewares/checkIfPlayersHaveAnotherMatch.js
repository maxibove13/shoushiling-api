// Model
const match = require("../models/match");

const checkIfPlayersHaveAnotherMatch = (req, res, next) => {
  // All the matches that contains player_1 and player_2 ids, $and the state is "waitingApproval" $or "playing".
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
  // Returns true or false whether the document exists or not
  match.exists(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result) {
        res.status(400).json({
          msg: "Ya tienes una partida en curso con ese usuario",
          result,
        });
      } else {
        // Users don't have another match between them, proceed
        console.log("WELL DONE");
        next();
      }
    }
  });
};

module.exports = checkIfPlayersHaveAnotherMatch;
