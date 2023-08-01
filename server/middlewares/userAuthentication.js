const jwt = require("jsonwebtoken");

exports.userAuthentication = (req, res, next) => {
  // extracting token from req object
  const token = req.headers.authorization;
  try {
    // decrypting token
    const { userId } = jwt.verify(token, process.env.JWT_PASSWORD_TOKEN);
    // assging userId to req object cause req obj is a global object
    req.userId = userId;

    // move to the next middleware
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json("invalid Token");
  }
};
