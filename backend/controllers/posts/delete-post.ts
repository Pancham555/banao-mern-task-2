import { Request, Response } from "express";
import jswt, { Secret } from "jsonwebtoken";
import Post from "../../models/postModel";

export default async (req: Request, res: Response) => {
  const { _id } = req.body;
  const { jwt } = req.cookies;
  try {
    // @ts-ignore
    const secret: Secret = process.env.JWT_SECRET;
    const getJwtData = jswt.verify(jwt, secret);
    const findPost = await Post.findById(_id);

    // @ts-ignore
    if (getJwtData?.username !== findPost?.username) {
      return res.send({
        message: "Sorry! You are not authorized to delete this post",
      });
    }

    await Post.findByIdAndDelete(_id);

    res.send({ message: "Post has been deleted successfully!" });
  } catch (error) {
    console.log(error);
  }
};
