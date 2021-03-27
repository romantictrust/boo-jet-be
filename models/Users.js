import mongoose from "mongoose";

const { Schema } = mongoose;

const UsersSchema = new Schema(
  {
    confirmed: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 50,
    },
    bills: {},
    hash: String,
    salt: String,
  },
  { minimize: false }
);
export default mongoose.model("Users", UsersSchema)

