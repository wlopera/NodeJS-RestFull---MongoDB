"use strict";

const mongoose = require("mongoose");
const config = require("./config");
const app = require("./app");

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error al conectarse a la base de datos: ${err}`);
  }

  console.log("Conexión a la base de datos establecida");

  app.listen(config.port, () =>
    console.log(`API Rest correindo en HTTP puerto ${config.port}`)
  );
});
