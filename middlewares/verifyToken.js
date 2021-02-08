const jwt = require("jsonwebtoken");

// In order to verify you have to send the token in the header with key: Authorization & value: <token>

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // If we have an authHeader return the authorization portion of authHeader, otherwise return undefined
  const token = authHeader && authHeader.split(" ")[1];
  try {
    // Validate that the user's token is the right one
    const decoded = jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.status(403);
      } else {
        // Inyect user's information in the request
        req.user = {
          id: decoded.id,
        };
      }
    });

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid Credentials", error });
  }
};

module.exports = verifyToken;
