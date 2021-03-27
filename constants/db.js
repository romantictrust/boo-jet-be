import dotenv from "dotenv";
dotenv.config();

export const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@maincluster.pzzs3.mongodb.net/mainDB?retryWrites=true&w=majority`;

