"use script";

const jwt = require("jwt-simple");
const momment = require("momment");
const config = require("../config");

const createToken = (user) => {
  const payload = {
    sub: user._id, // Este deberia ser otro codigo generado para mantener la integridad de la BD
    iat: momment().unix(),
    exp: momment().add(14, "days").unix(),
  };

  return jwt.encode(payload, config.SECRET_TOKEN);
};

const decodeToken = (token) => {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);

      if (payload.exp <= momment().unix()) {
        reject({
          status: 401,
          message: "El token ha expirado",
        });
      }
      resolve(payload.sub);
    } catch (error) {
      reject({
        status: 500,
        message: "Invalido Token",
      });
    }
  });

  return decoded;
};

module.exports = { createToken, decodeToken };
