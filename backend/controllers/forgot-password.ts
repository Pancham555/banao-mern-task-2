import { Request, Response } from "express";
import User from "../models/userModel";
import jswt from "jsonwebtoken";
import nodemailer from "nodemailer";

export default async (req: Request, res: Response) => {
  const { email } = req.body;
  // console.log(req.body, "email");

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, send error message
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a unique JWT token for the user that contains the user's id
    // @ts-ignore
    const token = jswt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
    });

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:3000/auth/reset-password?token=${token}">http://localhost:3000/auth/reset-password?token=${token}</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Email sent! Please check you inbox." });
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({ message: err });
  }
};
