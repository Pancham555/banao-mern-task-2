import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  // const { jwt }: string | any = req.cookies;
  // console.log(req.cookies, "jwtcookies");

  // if (!jwt) {
  //   return res.send({ message: "No login information found!" });
  // }
  res.clearCookie("jwt");

  res.send({
    message: "Log out successfully!",
  });
};
