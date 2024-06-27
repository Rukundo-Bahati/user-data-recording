const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(404).send("Access Denied. No Token Provided.");
  try {
    const decoded = jwt.verify(token, config.get("JWTPRIVATEKEY"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send("Invalid Token");
  }
};
