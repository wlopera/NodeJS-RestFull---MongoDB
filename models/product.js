"use script";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  picture: String,
  price: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ["computers", "prhones", "accesories"],
  },
  description: String,
});

module.exports = mongoose.model("Product", ProductSchema);
