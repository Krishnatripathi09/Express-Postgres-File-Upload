const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.verifyPWD = async function (password) {
  const user = this;

  const validPWD = await bcrypt.compare(password, user.password);

  return validPWD;
};

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ id: user.id }, "MysecretKey619", {
    expiresIn: "1d",
  });

  return token;
};

module.exports = mongoose.model("User", userSchema);
