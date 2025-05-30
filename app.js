const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth.js");
const { profileRouter } = require("./routes/profile.js");
const { ratelimit } = require("express-rate-limit");
const app = express();
app.use(cookieparser());
app.use(express.json());
const PORT = 3000;

const apiLimit = ratelimit({
  windowMs: 15 * 60 * 60,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use("/", apiLimit, authRouter);
app.use("/", apiLimit, profileRouter);

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
