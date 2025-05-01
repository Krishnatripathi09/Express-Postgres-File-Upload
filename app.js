const express = require("express");

const app = express();

const PORT = 3000;

app.post("/user", (req, res) => {
  const { firstName, lastName } = req.body;
});

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT ${PORT}`);
});
