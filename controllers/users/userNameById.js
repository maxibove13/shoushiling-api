// Models
const user = require("../../models/user");

const userNameById = (req, res) => {
  const query = {
    _id: req.body.id_user,
  };

  user.findOne(query, (err, user) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ msg: "No se logró realizar la consulta a la base de datos" });
    } else {
      // Convert user to plain old js object
      const userWithoutPassword = user.toObject();
      // delete the password
      delete userWithoutPassword.password;
      res.status(200).send(userWithoutPassword);
    }
  });
};

module.exports = userNameById;
