// Model
const user = require("../models/user");

const checkIfUsersExists = (req, res, next) => {
  // Check that player_1 & player_2 are not the same
  if (req.body.player_1.id_user === req.body.player_2.id_user) {
    res
      .status(400)
      .json({ msg: "No es posible iniciar una partida contra si mismo" });
  } else {
    // Proceed
    next();
  }
};

module.exports = checkIfUsersExists;
