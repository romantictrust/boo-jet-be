import mongoose from "mongoose";
import UsersModel from "../models/Users.js";

export const widget_post = (req, res) => {
  const user = req.body.user;
  const widget = req.body.widget;

  return UsersModel.findByIdAndUpdate(
    user.id,
    {
      $addToSet: {
        widgets: { ...widget, budget: mongoose.Types.ObjectId(widget.budget) },
      },
    },
    { new: true }
  ).exec((err, user) => {
    if (err) {
      res.status(500).json({
        error: `Cannot save new budget`,
      });
    } else {
      res.status(200).send(user.widgets);
    }
  });
};

export const widgets_get = (req, res) => {
  const userId = req.params.userId;
  return UsersModel.findById(userId).exec((err, user) => {
    if (err) {
      res.status(500).json({
        error: `Cannot get widgets`,
      });
    } else {
      res.status(200).send(user.widgets);
    }
  });
};

export const widget_delete = (req, res) => {
  const user = req.body.user;
  const widget = req.body.widget;

  return UsersModel.findByIdAndUpdate(
    user.id,
    {
      $pull: { widgets: widget },
    },
    { new: true }
  ).exec((err, user) => {
    if (err) {
      res.status(500).json({
        error: `Cannot remove widget`,
      });
    } else {
      res.status(200).send(user.widgets);
    }
  });
};
