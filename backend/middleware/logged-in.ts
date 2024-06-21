import { NextFunction, Request, Response } from "express";
import jswt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { jwt }: string | any = req.cookies;
  // console.log(req.cookies, "jwt");

  if (!jwt || jwt === "") {
    // Do some another function
    return res.status(401).send({ message: "You are not authorized!" });
  }

  // @ts-ignore
  const secret: Secret = process.env.JWT_SECRET;
  // const verifyUser = jswt.verify(jwt, secret);

  // res.send({ authorized: verifyUser });
  // console.log("passed through middleware");

  next();
};
