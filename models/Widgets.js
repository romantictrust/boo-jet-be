import mongoose from "mongoose";
import widgetTypes from "../constants/types/widgets.js";

const { Schema } = mongoose;

const widgetIdValidator = (v) => widgetTypes.find((action) => action.id === v);

const WidgetsSchema = new Schema({
  type: {
    type: Number,
    required: true,
    validate: [widgetIdValidator, "Not valid type for widget"],
  },
  data: [{ type: Schema.ObjectId, ref: "SourcesSchema" }],
  name: {
    type: String,
    minlength: 2,
    maxlength: 25,
    default: "Widget",
  },
});
export default WidgetsSchema;

// https://stackoverflow.com/questions/38051977/what-does-populate-in-mongoose-mean
