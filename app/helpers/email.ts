import postmark, { Message } from "postmark";
import nodemailer from "nodemailer";

const postmarkKey = process.env.POSTMARK_KEY;
const emailFrom = process.env.EMAIL_FROM || "itteam@agusto.com";
const emailClient = new postmark.ServerClient(`${postmarkKey}`);
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

if (!postmarkKey) throw new Error("Sendgrid key not found");

export const sendEmailService = async (mailPayload: Message) => {
  try {
    await emailClient.sendEmail({
      ...mailPayload,
      From: `"Agusto & Co. RMS " <${emailFrom}>`,
    });
    // console.log("Email sent successfully");
  } catch (error) {
    console.error("SENDING EMAIL ERROR", error);
    // console.error("Cannot complete this request at the moment");
  }
};

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

export const sendEmailServiceOld = async (mailPayload: Message) => {
  try {
    const info = await transporter.sendMail({
      from: `"Agusto & Co. RMS " <${SMTP_EMAIL}>`,
      to: mailPayload.To,
      subject: mailPayload.Subject,
      html: mailPayload.HtmlBody,
      text: mailPayload.TextBody,
      replyTo: "itteam@agusto.com",
    });
    // console.log("Email sent successfully", info);
  } catch (error: any) {
    // console.error("SENDING EMAIL ERROR", error);
    return error?.message;
  }
};
