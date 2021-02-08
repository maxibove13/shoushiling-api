const bcrypt = require("bcrypt"); // hash the user's password
const Joi = require("@hapi/joi"); // validate the user's fields.
const user = require("../../models/user");

const register = (req, res) => {
  // Create joi schema
  const schema = Joi.object({
    name: Joi.string().alphanum().required(),

    email: Joi.string().email().required(),

    password: Joi.string().alphanum().min(8).max(50).required(),
  });
  // Validate the body request
  const validationResult = schema.validate(req.body);

  if (!validationResult.error) {
    // hash the password
    const passwordHash = bcrypt.hashSync(req.body.password, 2);

    // create the user with mongoose
    user.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
      },
      (error, user) => {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: "Couldn't register user",
          });
        } else {
          // Convert user to plain old js object
          const userWithoutPassword = user.toObject();
          // delete the password
          delete userWithoutPassword.password;

          // respond the user
          res.json({
            user: userWithoutPassword,
          });
        }
      }
    );
  } else {
    res.status(400).json({
      message: validationResult.error,
    });
  }
};

module.exports = register;
