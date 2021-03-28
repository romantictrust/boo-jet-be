import mongoose from "mongoose";
import { dbUri } from "../constants/db.js";

const mongoConnect = async () => {
  // Configure mongoose's promise to global promise
  mongoose.Promise = global.Promise;

  await mongoose.connect(dbUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
export default mongoConnect;
