import UsersModel from "../models/Users.js";

export const budget_post = (req, res, next) => {
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
      const errorMsg = `Cannot save new budget`;
      res.status(500).json({
        error: errorMsg,
      });
      res.error = errorMsg;
      next();
    } else {
      res.status(200).send(user.budgetSources);
    }
  });
};

export const budget_edit = (req, res, next) => {
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
        const errorMsg = `Cannot edit budget`;
        res.status(500).json({
          error: errorMsg,
        });
        res.error = errorMsg;
        next();
      } else {
        res.status(200).send(user.budgetSources);
      }
    }
  );
};

export const budgets_get = (req, res, next) => {
  const userId = req.params.userId;
  return UsersModel.findById(userId).exec((err, user) => {
    if (err) {
      const errorMsg = `Cannot get budgets`;
      res.status(500).json({
        error: errorMsg,
      });
      res.error = errorMsg;
      next();
    } else {
      res.status(200).send(user.budgetSources);
    }
  });
};

export const budget_delete = (req, res, next) => {
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
      const errorMsg = `Cannot remove budget`;
      res.status(500).json({
        error: errorMsg,
      });
      res.error = errorMsg;
      next();
    } else {
      res.status(200).send(user.budgetSources);
    }
  });
};
