import mongoose from "mongoose";
import actionTypes, {
  actionsCategories,
} from "../../constants/types/budgetActions.js";

const { Schema } = mongoose;

const actionIdValidator = (v) => actionTypes.find((action) => action.id === v);
const actionCategoryValidator = (v) =>
  actionsCategories.find((category) => category.id === v);

const ActionsSchema = new Schema(
  {
    type: {
      type: Number,
      required: true,
      validate: [actionIdValidator, "Not valid type for bill action"],
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 25,
    },
    category: {
      type: Number,
      required: true,
      validate: [actionCategoryValidator, "Not valid type for action category"],
    },
    value: {
      type: Number,
      required: true,
      minimum: 0,
      exclusiveMinimum: true,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: { date: "created_at" } }
);
export default ActionsSchema;
