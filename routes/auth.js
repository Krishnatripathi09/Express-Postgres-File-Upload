const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
require("dotenv").config();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const userData = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await userData.save();

    res.status(201).send("Sign-Up SuccessFul Please Log-In");
  } catch (err) {
    res.status(400).send("Error Occured :" + err);
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send("Please Enter Valid Credentials");
  }

  const validPWD = await user.verifyPWD(password);

  if (validPWD) {
    const token = await jwt.sign({ _id: user.id }, process.env.SECRET_KEY);
    res.cookie("token", token);
    res.status(200).send("Logged-In SuccessFully");
  } else {
    res.status(400).send("Please Enter Valid Credentials --> Password");
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie(token, null, {
    expires: new Date(Date.now()),
  });

  res.status(200).send("Log-Out SuccessFull");
});

module.exports = authRouter;
