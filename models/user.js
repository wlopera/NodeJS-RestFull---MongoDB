"use script";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");

const UserSchema = Schema({
  email: { type: String, unique: true, lowercase: true },
  diaplayName: String,
  avatar: String,
  password: { type: String, select: false },
  singupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
});

UserSchema.pre("save", (next) => {
  const user = this;

  if (!user.isModified(password)) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        next(err);
      }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.gravatar = () => {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=200&d=retro`;
  }

  const md5 = crypto.createHash("md5").update(this.email.digest("hex"));

  return `https://gravatar.com/gravat/${md5}/?s=200&d=retro`;
};

module.exports = mongoose.model("User", UserSchema);
