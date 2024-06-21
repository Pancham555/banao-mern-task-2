import { Request, Response } from "express";
import jswt, { Secret } from "jsonwebtoken";
import Post from "../../models/postModel";

export default async (req: Request, res: Response) => {
  const { post } = req.body;
  const { jwt } = req.cookies;
  try {
    if (!post) {
      return res.send({ message: "post is required!" });
    }

    // @ts-ignore
    const secret: Secret = process.env.JWT_SECRET;
    const getJwtData = jswt.verify(jwt, secret);
    // console.log(getUsername);

    // @ts-ignore
    const createPost = new Post({ username: getJwtData?.username, post });
    await createPost.save();

    res.send({
      message: "Post created succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};
