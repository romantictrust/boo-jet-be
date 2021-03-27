import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from './routes/index.js'
import mongoConnect from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

mongoConnect().then(() => {
  // start listening to the port only after mongo connection established
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

// Configure app
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);
app.set("view engine", "ejs");

// use routes
app.use('/api', routes);

// use this middleware only in the bottom of code
app.use((req, res) => {
  res.status(404).render("errors/404", { errorCode: "404" });
});
