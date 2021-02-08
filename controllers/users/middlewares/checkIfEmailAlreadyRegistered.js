// Model
const user = require("../../../models/user");

const checkIfEmailAlreadyRegistered = (req, res, next) => {
  // Returns true or false whether the document exists or not
  user.exists({ email: req.body.email }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result) {
        res.status(400).json({ msg: "email already registered in our db." });
      } else {
        // Email not registered, proceed
        next();
      }
    }
  });
};

module.exports = checkIfEmailAlreadyRegistered;
