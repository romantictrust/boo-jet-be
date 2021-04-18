import UsersModel from "../models/Users.js";

export const budget_post = (req, res) => {
  const user = req.body.user;
  const budget = req.body.budget;

  return UsersModel.findByIdAndUpdate(
    user.id,
    {
      $addToSet: { budgetSources: budget },
    },
    { new: true }
  ).exec((err, user) => {
    if (err) {
      res.status(500).json({
        error: `Cannot save new budget`,
      });
    } else {
      res.status(200).send(user.budgetSources);
    }
  });
};

export const budget_edit = (req, res) => {
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
          error: `Cannot edit budget`,
        });
      } else {
        res.status(200).send(user.budgetSources);
      }
    }
  );
};

export const budgets_get = (req, res) => {
  const userId = req.params.userId;
  return UsersModel.findById(userId).exec((err, user) => {
    if (err) {
      res.status(500).json({
        error: `Cannot get budgets`,
      });
    } else {
      res.status(200).send(user.budgetSources);
    }
  });
};

export const budget_delete = (req, res) => {
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
        error: `Cannot remove budget`,
      });
    } else {
      res.status(200).send(user.budgetSources);
    }
  });
};
