// Dependencies
const Joi = require("@hapi/joi"); // validate the user's fields.

// Models
const match = require("../../models/match");

const updateMatch = (req, res) => {
  // Create joi schema
  const matchSchemaProto = Joi.object({
    state: Joi.string().valid("waitingApproval", "rejected", "playing", "finished"),

    player_1: Joi.object({
      id_user: Joi.string().alphanum().required(),
      points: Joi.number().max(2).integer().required(),
    }).required(),

    player_2: Joi.object({
      id_user: Joi.string().alphanum().required(),
      points: Joi.number().integer().valid(0, 1, 2).required(),
    }).required(),

    // games: Joi.array()
    //   .items(
    //     Joi.object({
    //       gameNumber: Joi.number().min(1).integer().required(),
    //       movePlayer_1: Joi.string().valid("Rock", "Paper", "Scissor").required(),
    //       movePlayer_2: Joi.string().valid("Rock", "Paper", "Scissor").required(),
    //       wonBy: Joi.number().integer().valid(0, 1, 2).required(),
    //     })
    //   )
    //   .required(),
  });

  const gameSchemaProto = Joi.object({
    games: Joi.array()
      .items(
        Joi.object({
          gameNumber: Joi.number().min(1).integer().required(),
          movePlayer_1: Joi.string().valid("Rock", "Paper", "Scissor").required(),
          movePlayer_2: Joi.string().valid("Rock", "Paper", "Scissor").required(),
          wonBy: Joi.number().integer().valid(0, 1, 2).required(),
        })
      )
      .required(),
  });
  // Define the match schema to request
  const matchSchema = {
    state: req.body.state,
    player_1: {
      id_user: req.body.player_1.id_user,
      points: req.body.player_1.points,
    },
    player_2: {
      id_user: req.body.player_2.id_user,
      points: req.body.player_2.points,
    },
    // games: [
    //   {
    //     gameNumber: req.body.games[gameNumberByLength - 1].gameNumber,
    //     movePlayer_1: req.body.games[gameNumberByLength - 1].movePlayer_1,
    //     movePlayer_2: req.body.games[gameNumberByLength - 1].movePlayer_2,
    //     wonBy: req.body.games[gameNumberByLength - 1].wonBy,
    //   },
    // ],
  };

  const gameSchema = {
    games: [
      {
        gameNumber: req.body.games[req.body.games.length - 1].gameNumber,
        movePlayer_1: req.body.games[req.body.games.length - 1].movePlayer_1,
        movePlayer_2: req.body.games[req.body.games.length - 1].movePlayer_2,
        wonBy: req.body.games[req.body.games.length - 1].wonBy,
      },
    ],
  };
  // Validate the schema
  const validationResult = matchSchemaProto.validate(matchSchema);
  const validationResultGame = gameSchemaProto.validate(gameSchema);

  if (!validationResult.error && !validationResultGame.error) {
    // find the match and update it. Return the updated match.
    match.findOneAndUpdate(
      {
        _id: req.body._id,
        "games.gameNumber": req.body.games[req.body.games.length - 1].gameNumber,
      },
      {
        $set: {
          "games.$": req.body.games,
          state: req.body.state,
          player_1: {
            id_user: req.body.player_1.id_user,
            points: req.body.player_1.points,
          },
          player_2: {
            id_user: req.body.player_2.id_user,
            points: req.body.player_2.points,
          },
        },
      },
      { new: true },
      (err, match) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "Couldn't update match" });
        } else {
          // respond the match

          console.log("match updated succesfully");
          res.status(200).send(match);
        }
      }
    );
  } else {
    res.status(400).json({
      msg: validationResult.error,
      req: req.body,
    });
  }
};

module.exports = updateMatch;
