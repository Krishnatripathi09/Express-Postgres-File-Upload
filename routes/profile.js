const express = require("express");
const User = require("../models/user.js");
const profileRouter = express.Router();

profileRouter.get("/users", async (req, res) => {
  //const { email, password } = req.body;
  const user = await User.findOne({});

  if (!user) {
    res.status(404).send("User Not Found with this Email");
  }

  res.status(200).send("Users Found" + user);
});

module.exports = {
  profileRouter,
};
