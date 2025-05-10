const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cookieparser());
app.use(express.json());
const PORT = 3000;

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    password: passwordHash,
  });

  await user.save();

  res.status(201).send("User Created SuccessFully");
});

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
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Please Enter Valid email and Password");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("Please Enter Valid Email");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    const token = jwt.sign({ id: user.id }, "MySecretKey619");
    res.cookie("token", token);
    res.status(200).send("Logged-In SuccessFully");
  } else {
    return res.status(400).send("Please Enter Valid Password");
  }
});

app.get("/user", (req, res) => {
  const cookie = req.cookies;

  const { token } = cookie;

  res.status(200).send(token);
});

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
