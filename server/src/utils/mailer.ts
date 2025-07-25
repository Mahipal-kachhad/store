import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: `store <${process.env.EMAIL_USER}>`,
    to,
    subject: "your otp code for password reset",
    html: `your otp code is ${otp} <strong>it is valid for 5 minutes.<strong>`,
  });
};
