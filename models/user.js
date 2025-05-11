const mongoose = require("mongoose");

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


suserSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ id: user.id }, "MysecretKey619", {
    expiresIn: "1d",
    httpOnly: true,
  });

  return token;
};

module.exports = mongoose.model("User", userSchema);
