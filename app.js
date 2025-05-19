const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth.js");
const app = express();
app.use(cookieparser());
app.use(express.json());
const PORT = 3000;

app.use("/", authRouter);

// app.get("/user", async (req, res) => {
//   const email = req.body.email;
//   const user = await User.findOne({ email: email });

//   res.status(200).send(user);
// });

// app.delete("/user", async (req, res) => {
//   const userEmail = req.body.email;

//   const deletedUser = await User.findOneAndDelete({ email: userEmail });

//   res.status(200).send("User Deleted Successfully");
// });


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
