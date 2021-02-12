// Dependencies
const Joi = require("@hapi/joi"); // validate the user's fields.

// Models
const match = require("../../models/match");

const updateMatch = (req, res) => {
  // Get the game number by the length of the array, couldn't get it in other way.
  const gameNumberByLength = req.body.games.length;
  // Create joi schema
  const schema = Joi.object({
    state: Joi.string().valid("rejected", "playing", "finished").required(),

    player_1: Joi.object({
      points: Joi.number().max(2).integer().required(),
    }).required(),

    player_2: Joi.object({
      points: Joi.number().integer().valid(0, 1, 2).required(),
    }).required(),

    games: Joi.array()
      .items(
        Joi.object({
          gameNumber: Joi.number().min(1).integer().required(),
          movePlayer_1: Joi.string()
            .valid("Rock", "Paper", "Scissor")
            .required(),
          movePlayer_2: Joi.string().valid("Rock", "Paper", "Scissor"),
          wonBy: Joi.number().integer().valid(1, 2),
        })
      )
      .required(),
  });
  // Define the match schema to request
  const matchSchema = {
    state: req.body.state,

    player_1: {
      points: req.body.player_1.points,
    },

    player_2: {
      points: req.body.player_2.points,
    },

    games: [
      {
        gameNumber: req.body.games[gameNumberByLength - 1].gameNumber,
        movePlayer_1: req.body.games[gameNumberByLength - 1].movePlayer_1,
        movePlayer_2: req.body.games[gameNumberByLength - 1].movePlayer_2,
        wonBy: req.body.games[gameNumberByLength - 1].wonBy,
      },
    ],
  };
  // Validate the schema
  const validationResult = schema.validate(matchSchema);

  if (!validationResult.error) {
    // find the match and update it
    match.updateOne({ _id: req.body._id }, matchSchema, (err, match) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "Couldn't update match" });
      } else {
        // respond the match
        console.log("match updated succesfully");
        res.status(200).send(match);
      }
    });
  } else {
    res.status(400).json({
      msg: validationResult.error,
      req: req.body,
    });
  }
};

module.exports = updateMatch;
