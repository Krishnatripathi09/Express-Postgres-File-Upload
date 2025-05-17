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

authRouter.post("/signin", (req, res) => {
  const { email, password } = req.body;
});

module.exports = authRouter;
