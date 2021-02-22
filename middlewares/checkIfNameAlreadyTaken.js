// Model
const user = require("../models/user");

const checkIfNameAlreadyTaken = (req, res, next) => {
  // Returns true or false whether the document exists or not
  user.exists({ name: req.body.name }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result) {
        res.status(400).json({ msg: "Alias ya existente" });
      } else {
        // Name not taken, proceed
        next();
      }
    }
  });
};

module.exports = checkIfNameAlreadyTaken;
