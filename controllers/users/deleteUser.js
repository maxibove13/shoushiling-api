// Models
const users = require("../../models/user");

const deleteUser = (req, res) => {
  //Delete the document associated with selected email
  const query = { email: req.body.email };
  users.deleteOne(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "Couldn't delete user" });
    } else {
      res.status(200).json({ msg: "User deleted succesfully" });
    }
  });
};

module.exports = deleteUser;
