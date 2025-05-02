const express = require("express");

const app = express();
app.use(express.json());
const PORT = 3000;

app.post("/user", (req, res) => {
  const { firstName, lastName } = req.body;

  res
    .status(200)
    .send("FirstName: " + " " + firstName + " " + "lastName" + " " + lastName);
});

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT ${PORT}`);
});
