"use script";

const User = require("../models/user");
const service = require("../services");

const singUp = (req, res) => {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
  });

  user.save((err) => {
    if (err) {
      res.status(500).send(`Error al crear el usuario: ${err}`);
    }

    res.status(200).send({ token: service.createToken(user) });
  });
};

const singIn = (req, res) => {
  user.find({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).send({ mesage: err });
    }
    if (!user) {
      return res.status(400).send({ message: " No existe el usuario" });
    }

    res.user = user;
    res.status(200).send({
      message: "Te has conectado correctamente",
      token: service.createToken(user),
    });
  });
};

module.exports = {
  singUp,
  singIn,
};