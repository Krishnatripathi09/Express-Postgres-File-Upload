const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const userData = await User({
    firstName,
    lastName,
    email,
    password: passwordHash,
  });

  userData.save();

  res.status(201).send("Sign-Up SuccessFul Please Log-In");
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send("Please Enter Valid Credentials");
  }

  const validPWD = await bcrypt.compare(password, user.password);

  if (validPWD) {
    res.status(200).send("Logged-In SuccessFully");
  } else {
    res.status(400).send("Please Enter Valid Credentials");
  }
});

module.exports = authRouter;
