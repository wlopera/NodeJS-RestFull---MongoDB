"use script";

const Product = require("../models/product");

// Consultar un producto por id, en la base de datos
const getProduct = () => {
  (req, res) => {
    const productId = req.params.productId;

    Product.findById(productId, (err, product) => {
      if (err) {
        res.status(500).send({
          message: `Error al consultar el producto en base de datos: ${err}`,
        });
      }
      if (!product) {
        res.status(404).send({ message: `El producto no existe` });
      }

      res.status(200).send({ product });
    });
  };
};

// Consultar todos los productos en la base de datos
const getProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      res.status(500).send({
        message: `Error al consultar el producto en base de datos: ${err}`,
      });
    }
    if (!products) {
      res.status(404).send({ message: `No existen productos` });
    }

    res.status(200).send({ products });
  });
};

// Agregar un producto a la base de datos
const saveProduct = () => {
  (req, res) => {
    console.log("Post : ", req.body);

    let product = new Product();

    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, productStored) => {
      if (err) {
        res.status(500).send({
          message: `Error al salvar el producto en base de datos: ${err}`,
        });
      }
      res.status(200).send({ product: productStored });
    });
  };
};

// Actualizar un producto en la base de datos
const updateProduct = () => {
  (req, res) => {
    const productId = req.params.productId;
    const body = req.body;

    Product.findByIdAndUpdate(productId, body, (err, productUpdated) => {
      if (err) {
        res
          .status(500)
          .send({ mesaage: `Error al actualizar el producto: ${err}` });
      }

      res.status(200).send({ product: productUpdated });
    });
  };
};

// Borrar un producto d ela base de datos
const deleteProduct = () => (req, res) => {
  const productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) {
      res.status(500).send({
        message: `Error al borrar el producto en base de datos: ${err}`,
      });
    }
    product.remove((err) => {
      if (err) {
        res.status(500).send({
          message: `Error al borrar el producto en base de datos: ${err}`,
        });
      }
      res
        .status(200)
        .send({ message: "El producto a sido borrado de la base de datos" });
    });
  });
};

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
};
