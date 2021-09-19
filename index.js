"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Product = require("./models/product");
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/product", (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      res.status(500).send({
        message: `Error al consultar registros en base de datos: ${err}`,
      });
    }
    if (!products) {
      res.status(404).send({ message: `No existen productos` });
    }

    res.status(200).send({ products });
  });
});

app.get("/api/product/:productId", (req, res) => {
  const productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) {
      res.status(500).send({
        message: `Error al consultar registro en base de datos: ${err}`,
      });
    }
    if (!product) {
      res.status(404).send({ message: `El producto no existe` });
    }

    res.status(200).send({ product });
  });
});

app.post("/api/product", (req, res) => {
  console.log("Post : ", req.body);

  let product = new Product();

  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((err, productStored) => {
    if (err) {
      res
        .status(500)
        .send({ message: `Error al salvar en base de datos: ${err}` });
    }
    res.status(200).send({ product: productStored });
  });
});

app.put("/api/product/:productId", (req, res) => {});

app.delete("/api/product/:productId", (req, res) => {});

mongoose.connect("mongodb://localhost:27017/shop", (err, res) => {
  if (err) {
    return console.log(`Error al conectarse a la base de datos: ${err}`);
  }

  console.log("Conexión a la base de datos establecida");

  app.listen(port, () =>
    console.log(`API Rest correindo en HTTP puerto ${port}`)
  );
});
