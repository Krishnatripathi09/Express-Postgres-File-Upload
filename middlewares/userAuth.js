const { User } = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(400).send("Un-Authorized! Please Log-In Again");
  }

  const decodedMsg = await jwt.verify(token, process.env.SECRET_KEY);

  const { id } = decodedMsg;

  const user = await User.findById(id);

  if (!user) {
    res.status(400).send("User Not Found");
  }

  req.user = user;
  next();
};

module.exports = {
  userAuth,
};
