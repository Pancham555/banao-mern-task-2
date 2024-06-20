import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/userModel";
import jswt, { Secret } from "jsonwebtoken";

interface BodyProps {
  email_or_username: string;
  password: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email_or_username, password }: BodyProps = req.body;
    // const { jwt }: { jwt: string } = req.cookies;
    if (!email_or_username || !password) {
      return res.send({
        message: `Incomplete credentials!`,
      });
    }

    const isUserExist =
      (await User.findOne({ username: email_or_username })) ||
      (await User.findOne({ email: email_or_username }));

    if (!isUserExist) {
      return res.send({ message: "No such user exist! Try creating one" });
    }

    const verify = await bcryptjs.compare(password, isUserExist.password);

    if (!verify) {
      return res.send({
        message: "Email or password didn't match",
      });
    }

    // @ts-ignore
    const secret: Secret = process.env.JWT_SECRET;
    const signJwt = jswt.sign(
      { username: isUserExist.username, email: isUserExist.email },
      secret,
      {
        expiresIn: "60 days",
      }
    );

    res
      // .setHeader("Access-Control-Allow-Origin", "*")
      .cookie("jwt", signJwt, {
        httpOnly: true,
      })
      .send({
        message: "User logged in successfully!",
        jwt: signJwt,
      });
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
};
