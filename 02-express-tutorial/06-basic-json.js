const express = require("express");
const app = express();
const {products} = require("./data");

app.get("/", (req, res) => {
  res.json(products);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
