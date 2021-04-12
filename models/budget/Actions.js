import mongoose from "mongoose";
import actionTypes from "../../constants/types/budgetActions.js";

const { Schema } = mongoose;

const actionIdValidator = (v) => actionTypes.find((action) => action.id === v);

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
    value: {
      type: Number,
      required: true,
      minimum: 0,
      exclusiveMinimum: true,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);
export default ActionsSchema;
