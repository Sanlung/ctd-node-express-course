const express = require("express");
const app = express();
const {products} = require("./data");

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1><a href='/api/products'>Products</a>");
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const {id, name, image} = product;
    return {id, name, image};
  });
  res.json(newProducts);
});

app.get("/api/products/:productID", (req, res) => {
  // console.log(req.params);
  const {productID} = req.params;

  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    return res.status(404).send("Product does not exit");
  }
  res.json(singleProduct);
});

app.get("/api/products/:prodcuctID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("Hello World");
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  const {search, limit} = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search)
    );
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (!sortedProducts.length) {
    // res.status(200).send("No product matched your description");
    return res.json({success: true, data: []});
  }
  res.status(200).json(sortedProducts);
  // res.send("Hello World");
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
