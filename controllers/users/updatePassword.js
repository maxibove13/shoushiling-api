const bcrypt = require("bcrypt"); // hash the user's password
const Joi = require("@hapi/joi"); // validate the user's fields.
const user = require("../../models/user");

const updatePassword = (req, res) => {
  // find the user
  user.findOne({ email: req.body.email }, (err, userFound) => {
    if (err) {
      res.status(500).json({ msg: "Couln't make the query" });
    } else {
      if (userFound) {
        // If the user is found, compare the actual password hash with the one in the db
        const match = bcrypt.compareSync(req.body.actualPassword, userFound.password);
        // if match, proceed to update the password
        if (match) {
          // define password schema
          const passwordSchema = Joi.object({
            password: Joi.string().alphanum().min(8).max(50).required(),
          });
          // Convert the new password to an independent object in order to be interpreted by joi
          const passwordObject = { password: req.body.newPassword };
          // Validate requested new password
          const validatePassword = passwordSchema.validate(passwordObject);
          // If the new password pass the validation test of Joi
          if (!validatePassword.error) {
            // hash the new password
            const passwordHash = bcrypt.hashSync(req.body.newPassword, 2);
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
                      userUpdatedWithoutPassword,
                    });
                  }
                });
              }
            });
          } else {
            res.status(400).json({ msg: validatePassword.error });
          }
        } else {
          res.status(400).json({ msg: "La contraseña actual no es correcta" });
        }
      } else {
        res.status(401).json({ msg: "User not found" });
      }
    }
  });
  // Check that the actual password typed by the user is correct:
  // Compare the req password hash with the one in the db.
};

module.exports = updatePassword;
