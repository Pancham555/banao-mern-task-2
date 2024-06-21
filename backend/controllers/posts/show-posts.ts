import { Request, Response } from "express";
import Post from "../../models/postModel";
export default async (req: Request, res: Response) => {
  const { _id } = req.query;
  try {
    if (!_id) {
      const showPosts = await Post.find({}).populate("comments");

      return res.send({
        posts: showPosts,
      });
    }
    const showPost = await Post.findById(_id).populate("comments");

    res.send({
      post: showPost,
    });
  } catch (error) {
    console.log(error);
  }
};
