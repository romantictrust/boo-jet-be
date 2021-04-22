import actionTypes from "../constants/types/budgetActions.js";
import UsersModel from "../models/Users.js";

export const budgetAction_post = (req, res) => {
  const budgetId = req.body.budgetId;
  const action = req.body.budgetAсtion;

  const { operation } = actionTypes.find(
    (actionType) => action.type === actionType.id
  );

  return UsersModel.findOneAndUpdate(
    { "budgetSources._id": budgetId },
    {
      $addToSet: {
        "budgetSources.$.actions": action,
      },
      $inc: { "budgetSources.$.value": `${operation}${action.value}` },
    },
    { new: true }
  ).exec((err, user) => {
    if (err) {
      res.status(500).json({
        er: err,
        error: `Cannot save new action`,
      });
    } else {
      res.status(200).send(user.budgetSources);
    }
  });
};

export const budgetAction_edit = (req, res) => {
  const budget = req.body.budget;

  return UsersModel.findOneAndUpdate(
    { "budgetSources._id": budget._id },
    {
      $set: {
        "budgetSources.$.name": budget.name,
        "budgetSources.$.currency": budget.currency,
        "budgetSources.$.value": budget.value,
      },
    },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).json({
          error: `Cannot edit action`,
        });
      } else {
        res.status(200).send(user.budgetSources);
      }
    }
  );
};

export const budgetAction_delete = (req, res) => {
  const user = req.body.user;
  const budget = req.body.budget;

  return UsersModel.findByIdAndUpdate(
    user.id,
    {
      $pull: { budgetSources: budget },
    },
    { new: true }
  ).exec((err, user) => {
    if (err) {
      res.status(500).json({
        error: `Cannot remove action`,
      });
    } else {
      res.status(200).send(user.budgetSources);
    }
  });
};
