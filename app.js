const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const app = express();
app.use(express.json());
const PORT = 3000;

app.post("/user", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await user.save();

  res.status(201).send("User Created SuccessFully");
});

app.get("/user", async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });

  res.status(200).send(user);
});

app.delete("/user", async (req, res) => {
  const userEmail = req.body.email;

  const deletedUser = await User.findOneAndDelete({ email: userEmail });

  res.status(200).send("User Deleted Successfully");
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
