import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";

import routes from "./routes/index.js";
import mongoConnect from "./config/db.js";
import configurePassport from "./config/passport.js";
import errorLogger from "./middlewares/errorLogger.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = process.cwd();

const app = express();

mongoConnect()
  .then(() => {
    // start listening to the port only after mongo connection established
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log(err));

morgan.token("id", (req) => req.id);
const assignId = (req, res, next) => {
  req.id = v4();
  next();
};
let accessLogSteam = fs.createWriteStream(
  path.join(__dirname, "logs/access.log"),
  { flags: "a" }
);

// Configure app
app.use(cors());
app.use(express.json());
app.use(assignId);
app.use(morgan(":id :date :method :status :url 'HTTP/:http-version'"));
app.use(
  morgan(":id :date :method :status :url 'HTTP/:http-version'", {
    stream: accessLogSteam,
  })
);
app.set("json spaces", 2);
app.set("view engine", "ejs");
configurePassport();

// use routes
app.use("/", routes);

// ending middlewares
app.use(errorLogger);

// not found page
app.use((req, res) => {
  res
    .status(404)
    .render("errors/404", { url: req.originalUrl, errorCode: "404" });
});
