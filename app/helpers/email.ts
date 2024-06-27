import postmark, { Message } from "postmark";

const postmarkKey = process.env.POSTMARK_KEY;
const emailFrom = process.env.EMAIL_FROM || "itteam@agusto.com";
const emailClient = new postmark.ServerClient(`${postmarkKey}`);

if (!postmarkKey) throw new Error("Sendgrid key not found");

export const sendEmailService = async (mailPayload: Message) => {
  try {
    await emailClient.sendEmail({
      ...mailPayload,
      From: `${mailPayload.From} <${emailFrom}>`,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("SENDING EMAIL ERROR", error);
    console.error("Cannot complete this request at the moment");
  }
};
