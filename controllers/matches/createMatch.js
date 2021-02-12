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
      id_user: Joi.string().required(),
      points: Joi.number().max(2).integer().required(),
    }).required(),

    player_2: Joi.object({
      id_user: Joi.string().required(),
      points: Joi.number().integer().valid(0, 1, 2).required(),
    }).required(),

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
  // Define the match schema to request
  const matchSchema = {
    state: "waitingApproval",

    player_1: {
      id_user: req.body.player_1.id_user,
      points: 0,
    },

    player_2: {
      id_user: req.body.player_2.id_user,
      points: 0,
    },

    games: [],
  };
  // Validate the schema
  const validationResult = schema.validate(matchSchema);
  console.log("entering createMatch");

  if (!validationResult.error) {
    // Create the match
    match.create(matchSchema, (err, match) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "Couldn't create match" });
      } else {
        // respond the match
        console.log("match Created succesfully");
        res.status(200).send(match);
      }
    });
  } else {
    res.status(400).json({
      msg: validationResult.error,
    });
  }
};

module.exports = createMatch;
