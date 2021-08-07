import fs from "fs";
import path from "path";

const errorLogger = (req, res) => {
  if (res.statusCode === 400) {
    const __dirname = process.cwd();
    let accessLogSteam = fs.createWriteStream(
      path.join(__dirname, "logs/errors.log"),
      { flags: "a" }
    );
    accessLogSteam.write(
      `ID: ${req.id} \r\nDate: ${new Date(
        Date.now()
      ).toISOString()}\r\nMethod: ${req.method}\r\nURL: ${req.originalUrl}\r\n`
    );
    accessLogSteam.write(`Params: ${JSON.stringify(req.payload)}\r\n`);
    accessLogSteam.write(`Req Body: ${JSON.stringify(req.body)}\r\n`);
    accessLogSteam.write(`Error: ${res.error}\r\n`);
    accessLogSteam.write(`\r\n`);
  }
};
export default errorLogger;
