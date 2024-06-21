import { Request, Response } from "express";
import jswt, { Secret } from "jsonwebtoken";
import Post from "../../models/postModel";

export default async (req: Request, res: Response) => {
  const { post, _id } = req.body;
  const { jwt } = req.cookies;
  try {
    // @ts-ignore
    const secret: Secret = process.env.JWT_SECRET;
    const getJwtData = jswt.verify(jwt, secret);
    const findPost = await Post.findById(_id);

    if (!post) {
      return res.status(422).send({
        message: "Updated post cannot be empty!",
      });
    }

    // @ts-ignore
    if (getJwtData?.username !== findPost?.username) {
      return res.status(401).send({
        message: "Sorry! You are not authorized to update this post",
      });
    }

    await Post.findByIdAndUpdate(_id, {
      post,
    });

    res.send({ message: "Post has been updated successfully!" });
  } catch (error) {
    console.log(error);
  }
};
