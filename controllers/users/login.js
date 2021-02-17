const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../models/user");

const login = (req, res) => {
  const query = { email: req.body.email };
  user.findOne(query, (err, userFound) => {
    if (err) {
      res.status(500).json({ msg: "Couln't make a query while signing in" });
    } else {
      if (userFound) {
        // Compare the req password hash with the one in the db.
        const match = bcrypt.compareSync(req.body.password, userFound.password);

        if (match) {
          // Convert user to plain old js object
          const userWithoutPassword = userFound.toObject();
          delete userWithoutPassword.password;

          // Adding user token
          userWithoutPassword.token = jwt.sign(
            {
              id: userFound._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "7d" }
          );
          res.status(200).json({ userFound: userWithoutPassword });
        } else {
          res.status(401).json({ msg: "User credential didn't match" });
          // res.status(401).end();
        }
      } else {
        res.status(401).json({ msg: "User not found" });
      }
    }
  });
};

module.exports = login;
