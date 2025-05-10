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
    const id = user.id;
    const token = jwt.sign({ id: id }, "MySecretKey619", {
      expiresIn: "24h",
      httpOnly: true,
    });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 360000),
      httpOnly: true,
    });
    res.status(200).send("Logged-In SuccessFully");
  } else {
    return res.status(400).send("Please Enter Valid Password");
  }
});

app.get("/user", async (req, res) => {
  const cookie = req.cookies;

  const { token } = cookie;
  const decoded = jwt.verify(token, "MySecretKey619");
  const { id } = decoded;

  const user = await User.findById(id).select("firstName lastName email");
  res.status(200).send("Success" + user);
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
