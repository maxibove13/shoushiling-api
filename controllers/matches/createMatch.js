// Dependencies
const Joi = require("@hapi/joi"); // validate the user's fields.

// Models
const match = require("../../models/match");

const createMatch = (req, res) => {
  // Create joi schema
  const schema = Joi.object({
    state: Joi.string()
      .valid("waitingApproval", "rejected", "playing", "finished")
      .required(),

    player_1: Joi.object({
      idUser: Joi.string().required(),
      points: Joi.number().max(2).integer().required(),
    }),

    player_2: Joi.object({
      idUser: Joi.string().required(),
      points: Joi.number().integer().valid(0, 1, 2).required(),
    }),

    games: Joi.array()
      .items(
        Joi.object({
          gameNumber: Joi.number(),
          movePlayer_1: Joi.string().valid("Rock", "Paper", "Scissor"),
          movePlayer_2: Joi.string().valid("Rock", "Paper", "Scissor"),
          wonBy: Joi.number().integer().valid(1, 2),
        })
      )
      .required(),
  });

  // Validate the body request:
  const validationResult = schema.validate(req.body);
  console.log("entering createMatch");

  if (!validationResult.error) {
    // Create the match
    match.create(
      {
        state: req.body.state,

        player_1: req.body.player_1,
        idUser: req.body.player_1.idUser,
        points: req.body.player_1.points,

        player_2: req.body.player_2,
        idUser: req.body.player_2.idUser,
        points: req.body.player_2.points,

        games: req.body.games,
        gameNumber: req.body.games.gameNumber,
        movePlayer_1: req.body.games.movePlayer_1,
        movePlayer_2: req.body.games.movePlayer_2,
        wonBy: req.body.games.wonBy,
      },
      (err, match) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "Couldn't create match" });
        } else {
          // respond the match
          res.status(200).send(match);
        }
      }
    );
  } else {
    res.status(400).json({
      msg: validationResult.error,
    });
  }
};

module.exports = createMatch;
