const express = require("express");
const app = express();
const consoleLog = require("./practice-middleware");

app.use(express.static("./new-public"));
app.use(consoleLog);

app.get("/sample", (req, res) => {
  res.send("<h1>This is working</h1>");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
