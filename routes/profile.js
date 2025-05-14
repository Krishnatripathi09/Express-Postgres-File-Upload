const express = require("express");
const User = require("../models/user.js");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.findOne({ email });
});
