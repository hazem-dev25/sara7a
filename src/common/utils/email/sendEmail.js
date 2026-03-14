import nodemailer from "nodemailer";
import { app_email, app_password } from "../../../../config/index.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: app_email,
    pass: app_password,
  },
});

// Send an email using async/await
export const sendEmail = async ({
    to ,
    subject ,
    html
}) => {
  const info = await transporter.sendMail({
    from: `'"facebook"<${app_email}>'`,
    to,
    subject,
    text: "Hello world?", 
    html 
  });
}