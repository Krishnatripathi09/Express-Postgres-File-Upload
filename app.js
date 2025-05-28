const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth.js");
const { profileRouter } = require("./routes/profile.js");
const app = express();
app.use(cookieparser());
app.use(express.json());
const PORT = 3000;

app.use("/", authRouter);
app.use("/", profileRouter);

connectDB()
  .then(() => {
    console.log("Connected To DataBase SuccessFully");
    app.listen(PORT, () => {
      console.log(`Server is Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
