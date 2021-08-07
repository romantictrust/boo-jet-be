import fs from "fs";
import path from "path";
const errorHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (err) {
    const __dirname = process.cwd();
    let accessLogSteam = fs.createWriteStream(
      path.join(__dirname, "logs/unhandledErrors.log"),
      { flags: "a" }
    );
    accessLogSteam.write(
      `ID: ${req.id} \r\nDate: ${new Date(
        Date.now()
      ).toISOString()}\r\nMethod: ${req.method}\r\nURL: ${req.baseUrl}\r\n`
    );
    accessLogSteam.write(`Params: ${JSON.stringify(req.payload)}\r\n`);
    accessLogSteam.write(`Body: ${JSON.stringify(req.body)}\r\n`);
    accessLogSteam.write(`${err.stack}\r\n`);
    accessLogSteam.write(`\r\n`);
    res.status(500).send({
      er: err.stack,
      error: `Internal Server Error`,
    });
  }
};
export default errorHandler;
