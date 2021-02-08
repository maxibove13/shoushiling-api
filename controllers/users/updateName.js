const Joi = require("@hapi/joi"); // validate the user's fields.
const user = require("../../models/user");

const updateName = (req, res) => {
  // define name schema
  const nameSchema = Joi.object({
    name: Joi.string().alphanum().required(),
  });
  // Convert the name to an independent object in order to be interpreted by joi
  const nameObject = { name: req.body.name };
  // Validate requested new name
  const validateName = nameSchema.validate(nameObject);
  if (!validateName.error) {
    //Update the name to the db from associated email
    const query = { email: req.body.email };

    user.updateOne(query, { name: req.body.name }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "Couldn't update name" });
      } else {
        // Get the actual user
        user.findOne(query, (err, userUpdated) => {
          if (err) {
            console.log(err);
            res.status(500).json({ msg: "Couldn't find user" });
          } else {
            // Convert user to plain old js object
            const userUpdatedWithoutPassword = userUpdated.toObject();
            delete userUpdatedWithoutPassword.password;
            res
              .status(200)
              .json({
                msg: "name updated sucsessfully",
                userUpdatedWithoutPassword,
              });
          }
        });
      }
    });
  } else {
    console.log(nameObject);
    res.status(400).json({ msg: validateName.error });
  }
};

module.exports = updateName;
