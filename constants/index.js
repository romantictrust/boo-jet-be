import dotenv from "dotenv";
dotenv.config();

export const CLIENT_ORIGIN =
  process.env.NODE_ENV === "prod"
    ? process.env.CLIENT_ORIGIN
    : `localhost:${process.env.PORT}`;
