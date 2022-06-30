const express = require("express");
const app = express();

app.use(express.static("./new-public"));

app.get("/sample", (req, res) => {
  res.send("<h1>This is working</h1>");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
