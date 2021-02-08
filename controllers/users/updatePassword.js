const bcrypt = require("bcrypt"); // hash the user's password
const Joi = require("@hapi/joi"); // validate the user's fields.
const user = require("../../models/user");

const updatePassword = (req, res) => {
  // define password schema
  const passwordSchema = Joi.object({
    password: Joi.string().alphanum().min(8).max(50).required(),
  });
  // Convert the password to an independent object in order to be interpreted by joi
  const passwordObject = { password: req.body.password };
  // Validate requested new password
  const validatePassword = passwordSchema.validate(passwordObject);
  if (!validatePassword.error) {
    // hash the new password
    const passwordHash = bcrypt.hashSync(req.body.password, 2);
    //Update the hashed password to the db from associated email
    const query = { email: req.body.email };

    user.updateOne(query, { password: passwordHash }, (err, result) => {
      if (err) {
        console.log(error);
        res.status(500).json({ msg: "Couldn't update password" });
      } else {
        // Get the actual user
        user.findOne(query, (err, userUpdated) => {
          // if I use find instead of findeOne it returns an array!
          if (err) {
            console.log(err);
            res.status(500).json({ msg: "Couldn't find user" });
          } else {
            // Convert user to plain old js object
            const userUpdatedWithoutPassword = userUpdated.toObject();
            delete userUpdatedWithoutPassword.password;
            res.status(200).json({
              msg: "password updated sucsessfully",
              userUpdatedWithoutPassword,
            });
          }
        });
      }
    });
  } else {
    res.status(400).json({ msg: validatePassword.error });
  }
};

module.exports = updatePassword;
