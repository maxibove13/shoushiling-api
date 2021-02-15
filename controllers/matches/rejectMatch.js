// Dependencies
const Joi = require("@hapi/joi"); // validate the user's fields.

// Models
const match = require("../../models/match");

// Update the match state to rejected.
const rejectMatch = (req, res) => {
  // Create joi schema
  const schema = Joi.object({
    state: Joi.string().valid("rejected"),
  });
  // Define the match schema to request
  const matchSchema = {
    state: req.body.state,
  };
  // Validate the schema
  const validationResult = schema.validate(matchSchema);

  if (!validationResult.error) {
    // find the match and update it. Return the updated match.
    match.findOneAndUpdate(
      { _id: req.body._id },
      { $set: matchSchema },
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

module.exports = rejectMatch;
