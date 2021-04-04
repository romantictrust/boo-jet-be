import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";

const Users = mongoose.model("Users");

const configurePassport = () =>
  passport.use(
    new LocalStrategy(
      {
        usernameField: "user[email]",
        passwordField: "user[password]",
      },
      (email, password, done) => {
        Users.findOne({ email })
          .then((user) => {
            if (!user || !user.uncryptPassword(password)) {
              return done(null, false, {
                error: { "email or password": "is invalid" },
              });
            }

            return done(null, user);
          })
          .catch(done);
      }
    )
  );
export default configurePassport;
