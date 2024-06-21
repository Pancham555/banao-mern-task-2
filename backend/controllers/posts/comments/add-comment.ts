import { Request, Response } from "express";
import jswt, { Secret } from "jsonwebtoken";
import Post from "../../../models/postModel";

export default async (req: Request, res: Response) => {
  const { comment, _id } = req.body;
  const { jwt } = req.cookies;
  try {
    if (!comment || !_id) {
      return res.status(422).send({ message: "comment and _id is required!" });
    }
    // @ts-ignore
    const secret: Secret = process.env.JWT_SECRET;
    const getJwtData = jswt.verify(jwt, secret);

    await Post.findByIdAndUpdate(_id, {
      $push: {
        comments: {
          // @ts-ignore
          username: getJwtData?.username,
          comment,
        },
      },
    });
    // const createPost = new Post({ username, post });
    // await createPost.save();

    res.send({
      message: "Comment added succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};
