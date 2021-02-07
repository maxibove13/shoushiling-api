const bcrypt = require("bcrypt"); // hash the user's password
const Joi = require("@hapi/joi"); // validate the user's fields.
const userModel = require("../../models/user");

const register = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().required(),

    email: Joi.string().email().required(),

    password: Joi.string().alphanum().min(8).max(50).required(),
  });

  const validationResult = schema.validate(req.body);

  if (!validationResult.error) {
    const passwordHash = bcrypt.hashSync(req.body.password, 2);

    userModel.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
      },
      (error, user) => {
        if (error) {
          res.status(500).json({
            message: "Couldn't register user",
          });
        } else {
          const userWithoutPassword = user.toObject();

          delete userWithoutPassword.password;

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
