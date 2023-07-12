var express = require("express");
var cors = require("cors");
var db = require("./db.json");

const app = express();
app.use(cors());

app.get("/products", (req, res) => {
  let category = req.query.category;
  res.send(db["products"].filter((p) => p.category === category));
});

app.get("/products/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let items = db["products"].filter((p) => p.id === id);
  res.send(items[0]);
});

app.post("/shippingAddress", (req, res) => {});

app.listen(3001, () => console.log(`Example app listening on port 3001!`));
