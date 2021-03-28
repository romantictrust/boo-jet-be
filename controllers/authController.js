import UsersModel from "../models/Users.js";
import { collectEmail_post } from "./mailingController.js";

export const signup_post = (req, res) => {
  const {
    body: { user },
  } = req;

  if (!user.userName) {
    return res.status(422).json({
      errors: "Username is required",
    });
  }

  if (!user.email) {
    return res.status(422).json({
      errors: "Email is required",
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: "Password is required",
    });
  }

  const newUser = new UsersModel(user);
  collectEmail_post(newUser.toAuthJSON());
  newUser.cryptPassword(user.password);

  return newUser.save((err) => {
    if (err) {
      console.log(err);
      if (err.name === "MongoError" && err.code === 11000) {
        // Duplicate username
        return res.status(422).json({ errors: "User already exists!" });
      }
      return res.status(422).json({ errors: err });
    }
    res.json({ user: newUser.toAuthJSON() });
  });
};
export const login_post = (req, res) => {};
