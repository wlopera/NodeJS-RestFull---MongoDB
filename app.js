"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const api = require("./routers");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", api);

module.exports = app;
