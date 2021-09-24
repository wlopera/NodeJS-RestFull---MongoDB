"use script";

const User = require("../models/user");
const service = require("../services");

const signUp = (req, res) => {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password,
  });

  user.save((err) => {
    if (err) {
      res.status(500).send(`Error al crear el usuario: ${err}`);
    }
    const token = service.createToken(user);
    console.log(33333333333333, token, user);

    res.status(200).send({ token });
  });
};

const signIn = (req, res) => {
  User.find({ email: req.body.email }, (err, user) => {
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
  signUp,
  signIn,
};
