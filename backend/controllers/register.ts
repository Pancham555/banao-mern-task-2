import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import jswt, { Secret } from "jsonwebtoken";

interface BodyProps {
  username: string;
  email: string;
  password: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password }: BodyProps = req.body;
    if (!username || !email || !password) {
      return res.send({ message: "Incomplete credentials!" });
    }

    const isEmailAlreadyExists = await User.findOne({ email });
    const isUsernameTaken = await User.findOne({ username });

    if (isEmailAlreadyExists) {
      return res.send({ message: "Email already exists" });
    } else if (isUsernameTaken) {
      return res.send({
        message: "Sorry! This username is already been taken :(",
      });
    }

    const user = new User({ username, email, password });

    await user.save();

    // @ts-ignore
    const secret: Secret = process.env.JWT_SECRET;
    const signJwt = jswt.sign({ username, email, password }, secret, {
      expiresIn: "60 days",
    });

    res
      .cookie("jwt", signJwt, {
        httpOnly: true,
      })
      .send({
        message: "User created successfully!",
        username: user.username,
      });
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
};
