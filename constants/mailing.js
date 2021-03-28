import { CLIENT_ORIGIN } from "../constants/index.js";
import ejs from "ejs";

export const mailingMessages = {
  confirm: "Email sent, please check your inbox to confirm",
  confirmed: "Your email is confirmed!",
  resend: "Confirmation email resent, maybe check your spam?",
  couldNotFind: "Could not find user!",
  alreadyConfirmed: "Your email was already confirmed",
};

export const templates = {
  confirm: async (id) => {
    return {
      subject: "BooJet Confirm Email",
      html: await ejs.renderFile("views/mailing/confirmation.ejs", {
        origin: CLIENT_ORIGIN,
        id: id,
      }),
      text: `Copy and paste this link: ${CLIENT_ORIGIN}/mailing/confirm/${id}`,
    };
  },
};
export default templates;
