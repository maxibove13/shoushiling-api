// Dependencies
const express = require("express");
const router = express.Router();

// Models
const userModel = require("../models/user");

// Controllers
const getAllUsers = require("../controllers/users/getAllUsers");
const userNameById = require("../controllers/users/userNameById");

// Middlewares
const verifyToken = require("../middlewares/verifyToken");

// respond the list of users from the db
router.get("/", getAllUsers);

// request name in URL and respond corresponding user
router.get("/:name", (req, res) => {
  userModel.findOne({ name: req.params.name }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "couln't make the query to the db" });
    } else {
      if (user.length != 0) {
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        res.status(200).send(userWithoutPassword);
      } else {
        res.status(404).json({ msg: "user with requested name not found" });
      }
    }
  });
});

// Get user name by requested id
router.post("/nameById", verifyToken, userNameById);

module.exports = router;
