import mongoose from "mongoose";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const UsersSchema = new Schema(
  {
    confirmed: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 50,
    },
    bills: {},
    hash: String,
    salt: String,
  },
  { minimize: false }
);

UsersSchema.methods.cryptPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UsersSchema.methods.uncryptPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    "secret"
  );
};

UsersSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    email: this.email,
    userName: this.userName,
    confirmed: this.confirmed,
    bills: this.bills,
    token: this.generateJWT(),
  };
};

export default mongoose.model("Users", UsersSchema);
