import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (email: string, name: string) => {
  await transporter.sendMail({
    from: '"Next Basket" <no-reply@nextbasket.com>',
    to: email,
    subject: `Welcome to Next Basket`,
    text: `Welcome, ${name}\nwe are glad to have you onboard 🎉`, // plain‑text body
    //html: "<b>Hello world?</b>",
  })
}
