// Models
const user = require("../../models/user");

const getAllUsers = (req, res) => {
  user.find({}, (err, users) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "couln't make the query to the db" });
    } else {
      const usersWithoutPassword = users.map((user) => {
        user = user.toObject();
        delete user.password;
        return user;
      });

      res.status(200).json({ users: usersWithoutPassword });
    }
  });
};

module.exports = getAllUsers;
