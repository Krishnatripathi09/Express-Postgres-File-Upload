const express = require("express");
const User = require("../models/user.js");
const validateEditProfileData = require("../utils/validation.js");
const profileRouter = express.Router();

profileRouter.get("/users", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select("firstName lastName email");

  if (!user) {
    res.status(404).send("User Not Found with this Email");
  }

  res.status(200).send("Users Found" + user);
});

profileRouter.patch("/updateuser", (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      res.status(400).send("Edit Allowed on Only first and last Name fields");
    }

  const loggedInUser = req.user;

  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = {
  profileRouter,
};
