import mongodb from "mongodb";
import { dbUri } from "../constants/db.js";

const { MongoClient } = mongodb;

const mongoConnect = async () => {
  const client = new MongoClient(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
};
export default mongoConnect;
