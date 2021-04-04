import mongoose from "mongoose";
import sendEmail from "../config/mailing.js";
import { mailingMessages, templates } from "../constants/mailing.js";

const Users = mongoose.model("Users");

export const collectEmail_post = (req, res) => {
  const user = req.body || req;
  // We have a new user! Send them a confirmation email.
  if (user) {
    sendEmail(user.email, templates.confirm(user.id));
  }
  // We have already seen this email address. But the user has not
  // clicked on the confirmation link. Send another confirmation email.
  else if (user && !user.confirmed) {
    sendEmail(user.email, templates.confirm(user.id)).then(() =>
      res.json(mailingMessages.resend)
    );
  }
  // The user has already confirmed this email address
  else {
    res.json(mailingMessages.alreadyConfirmed);
  }
};

export const confirmEmail_get = (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then((user) => {
      // The user exists but has not been confirmed. We need to confirm this
      // user and let them know their email address has been confirmed.
      if (user && !user.confirmed) {
        Users.findByIdAndUpdate(id, { confirmed: true })
          .then(() => res.json(mailingMessages.confirmed))
          .catch((err) => console.log(err));
      }

      // The user has already confirmed this email address.
      else {
        res.json(mailingMessages.alreadyConfirmed);
      }
    })
    .catch(() => res.json({ error: mailingMessages.couldNotFind }));
};
