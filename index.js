const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());

// server your css as static
app.use(express.static(__dirname + "/public/"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

const cart = require("./public/server/addToCart/index.post.json");
const banners = require("./public/server/banners/index.get.json");
const categories = require("./public/server/categories/index.get.json");
const products = require("./public/server/products/index.get.json");

app.get("/categories", (req, res) => {
  res.json(categories);
});

app.get("/banners", (req, res) => {
  res.json(banners);
});
app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/cart", (req, res) => {
  res.json(cart);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
