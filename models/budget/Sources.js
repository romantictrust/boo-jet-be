import mongoose from "mongoose";
import ActionsSchema from "./Actions.js";

const { Schema } = mongoose;

function colorValidator(v) {
  if (v.indexOf("#") == 0) {
    if (v.length == 7 || v.length == 4) {
      return true;
    }
    //TODO Add colors
    return ["red", "blue"].indexOf(v) > -1;
  }
}

const SourcesSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  currency: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    minimum: 0,
  },
  actions: [ActionsSchema],
  color: {
    type: String,
    required: false,
    default: "rgba(51, 163, 98, 0.205)",
    validate: [colorValidator, "Not a valid color for bill"],
  },
});
mongoose.model("BudgetSource", SourcesSchema, 'users');
export default SourcesSchema;
