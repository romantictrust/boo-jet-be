import mongoose from "mongoose";
import UsersModel from "../models/Users.js";

export const widget_post = (req, res, next) => {
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
      const errorMsg = `Cannot save new budget`;
      res.status(400).json({
        error: errorMsg,
      });
      res.error = errorMsg;
      next();
    } else {
      res.status(200).send(user.widgets);
    }
  });
};

export const widget_edit = (req, res, next) => {
  const widget = req.body.widget;

  return UsersModel.findOneAndUpdate(
    { "widgets._id": widget._id },
    {
      $set: {
        "widgets.$.name": widget.name,
        "widgets.$.type": widget.type,
        "widgets.$.width": widget.width,
        "widgets.$.budget": widget.budget,
        "widgets.$.dateTo": widget.dateTo,
        "widgets.$.dateFrom": widget.dateFrom,
      },
    },
    { new: true },
    (err, user) => {
      if (err) {
        const errorMsg = `Cannot edit budget`;
        res.status(400).json({
          error: errorMsg,
        });
        res.error = errorMsg;
        next();
      } else {
        res.status(200).send(user.widgets);
      }
    }
  );
};

export const widgets_get = (req, res, next) => {
  const userId = req.params.userId;
  return UsersModel.findById(userId).exec((err, user) => {
    if (err) {
      const errorMsg = `Cannot get widgets`;
      res.status(400).json({
        error: errorMsg,
      });
      res.error = errorMsg;
      next();
    } else {
      res.status(200).send(user.widgets);
    }
  });
};

export const widget_delete = (req, res, next) => {
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
      const errorMsg = `Cannot remove widget`;
      res.status(400).json({
        error: errorMsg,
      });
      res.error = errorMsg;
      next();
    } else {
      res.status(200).send(user.widgets);
    }
  });
};
