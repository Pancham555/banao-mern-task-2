import { Request, Response } from "express";
import jswt, { Secret } from "jsonwebtoken";
import Post from "../../../models/postModel";

export default async (req: Request, res: Response) => {
  const { _id } = req.body;
  const { jwt } = req.cookies;
  try {
    if (!_id) {
      return res.send({ message: "_id is required!" });
    }

    const checkLikes = await Post.findById(_id);
    if (checkLikes?.likes === 0) {
      return res.send({ message: "Sorry! Can't unlike post!" });
    }

    // @ts-ignore
    const secret: Secret = process.env.JWT_SECRET;
    const getJwtData = jswt.verify(jwt, secret);
    await Post.findByIdAndUpdate(_id, {
      $inc: {
        likes: -1,
      },
      $pull: {
        // @ts-ignore
        likedby: getJwtData?.username,
      },
    });

    res.send({
      message: "Like removed succesfully!",
    });
  } catch (error) {
    console.log(error);
  }
};
