import passport from "passport";
import UsersModel from "../models/Users.js";
import { collectEmail_post } from "./mailingController.js";

export const signup_post = (req, res) => {
  const {
    body: { user },
  } = req;

  if (user) {
    if (!user.userName) {
      return res.status(422).json({
        error: "Username is required",
      });
    }

    if (!user.email) {
      return res.status(422).json({
        error: "Email is required",
      });
    }

    if (!user.password) {
      return res.status(422).json({
        error: "Password is required",
      });
    }

    const newUser = new UsersModel(user);
    collectEmail_post(newUser.toAuthJSON());
    newUser.cryptPassword(user.password);

    return newUser.save((err) => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          // Duplicate username
          return res.status(422).json({ error: "User already exists!" });
        }
        return res.status(422).json({ error: err });
      }
      res.json({ user: newUser.toAuthJSON() });
    });
  } else res.status(400).json({ error: "Wrong user data" });
};

export const login_post = (req, res, next) => {
  const {
    body: { user },
  } = req;

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

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      }

      return res.status(400).json({
        error: "User not found",
      });
    }
  )(req, res, next);
};
