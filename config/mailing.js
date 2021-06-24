import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const credentials = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(credentials);

const sendEmail = async (to, content) => {
  const contacts = {
    from: process.env.MAIL_USER,
    to,
  };

  const email = { ...(await content), ...contacts };
  await transporter.sendMail(email);
};
export default sendEmail;
