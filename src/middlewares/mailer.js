const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async (email, subject, url, name) => {
  const port = process.env.PORT;
  const host = process.env.HOST;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    await transporter.sendMail({
      from: "Virtuous",
      to: email,
      subject: `"Thanks For Registering your Account"`,
      text: `"Hi! This is your token ${subject}"`,
    });
    console.log("Email sent");
    return "Email sent";
  } catch (err) {
    console.log("Email not send", err);
    return "Email not send";
  }
};
