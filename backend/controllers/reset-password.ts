import { Request, Response } from "express";
import User from "../models/userModel";
import jswt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  const { newPassword }: { newPassword: string } = req.body;
  try {
    // Verify the token sent by the user
    const decodedToken = jswt.verify(
      req.params.token,
      // @ts-ignore
      process.env.JWT_SECRET
    );

    // If the token is invalid, return an error
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // find the user with the id from the token
    // @ts-ignore
    const user = await User.findOne({ _id: decodedToken?.userId });
    if (!user) {
      return res.status(401).send({ message: "no user found" });
    }

    // Update user's password, clear reset token and expiration time
    user.password = newPassword;
    await user.save();

    // Send success response
    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    // Send error response if any error occurs
    res.status(500).send({ message: err });
  }
};
