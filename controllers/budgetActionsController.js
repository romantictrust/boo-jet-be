import actionTypes from "../constants/types/budgetActions.js";
import UsersModel from "../models/Users.js";

const getOperation = (budgetActionType, inverse = false) => {
  const { operation, inverseOperation } = actionTypes.find(
    (actionType) => budgetActionType === actionType.id
  );
  return inverse ? inverseOperation : operation;
};

export const budgetAction_post = (req, res, next) => {
  const budgetId = req.body.budgetId;
  const action = req.body.budgetAсtion;

  const operation = getOperation(action.type);

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
      const errorMsg = `Cannot save new action`;
      res.status(400).json({
        er: err,
        error: errorMsg,
      });
      res.error = errorMsg;
      next();
    } else {
      res.status(200).send(user.budgetSources);
    }
  });
};

export const budgetAction_edit = (req, res, next) => {
  const budgetAction = req.body.budgetAction.action;
  const budgetId = req.body.budgetAction.budgetId;

  const operation = getOperation(budgetAction.type);
  const inverseOperation = getOperation(budgetAction.prevAction, true);

  const updatedValue =
    Number(`${inverseOperation}${budgetAction.prevValue}`) +
    Number(`${operation}${budgetAction.value}`);

  return UsersModel.findOneAndUpdate(
    { "budgetSources._id": budgetId },
    {
      $set: {
        "budgetSources.$.actions.$[action].name": budgetAction.name,
        "budgetSources.$.actions.$[action].category": budgetAction.category,
        "budgetSources.$.actions.$[action].type": budgetAction.type,
        "budgetSources.$.actions.$[action].date": budgetAction.date,
        "budgetSources.$.actions.$[action].value": budgetAction.value,
      },
    },
    {
      arrayFilters: [{ "action._id": budgetAction._id }],
      new: true,
    },
    (err) => {
      const errorMsg = `Cannot edit action`;
      if (err) {
        res.status(400).json({
          error: errorMsg,
        });
        res.error = errorMsg;
        next();
      } else {
        UsersModel.findOneAndUpdate(
          { "budgetSources._id": budgetId },
          {
            $inc: { "budgetSources.$.value": updatedValue },
          },
          { new: true },
          (err, user) => {
            if (err) {
              res.status(400).json({
                error: errorMsg,
              });
              res.error = errorMsg;
              next();
            } else {
              res.status(200).send(user.budgetSources);
            }
          }
        );
      }
    }
  );
};

export const budgetAction_delete = (req, res, next) => {
  const user = req.body.user;
  const budgetAction = req.body.budgetAction.action;
  const budgetId = req.body.budgetAction.budgetId;

  const inverseOperation = getOperation(budgetAction.type, true);

  return UsersModel.updateOne(
    { _id: user.id },
    {
      $pull: { "budgetSources.$[].actions": { _id: budgetAction._id } },
    },
    {
      new: true,
    },
    (err) => {
      const errorMsg = `Cannot delete action`;
      if (err) {
        res.status(400).json({
          error: errorMsg,
        });
        res.error = errorMsg;
        next();
      } else {
        UsersModel.findOneAndUpdate(
          { "budgetSources._id": budgetId },
          {
            $inc: {
              "budgetSources.$.value": `${inverseOperation}${budgetAction.value}`,
            },
          },
          { new: true },
          (err, user) => {
            if (err) {
              res.status(400).json({
                error: errorMsg,
              });
              res.error = errorMsg;
              next();
            } else {
              res.status(200).send(user.budgetSources);
            }
          }
        );
      }
    }
  );
};
