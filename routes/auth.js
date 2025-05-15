const express = require("express");
const User = require("../models/user.js");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userData = await User({
    firstName,
    lastName,
    email,
    password,
  });

  userData.save();

  res.status(201).send("Sign-Up SuccessFul Please Log-In");
});

module.exports = authRouter;
