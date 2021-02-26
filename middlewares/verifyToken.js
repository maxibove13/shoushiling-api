const jwt = require("jsonwebtoken");

// In order to verify you have to send the token in the header with key: Authorization & value: <token>

const verifyToken = (req, res, next) => {
  console.log("hey");
  const token = req.headers.authorization;
  try {
    // Validate that the user's token is the right one
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Inyect user's information in the request
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Credentials", err });
  }
};

module.exports = verifyToken;
