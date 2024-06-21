import { Schema, model } from "mongoose";
import { commentSchema } from "./commentModel";

interface PostTypes {
  username: string;
  post: string;
  likes: number;
  likedby: string;
  comments: object[];
  // comments: typeof Types.ObjectId;
  // updated: string;
}

// 2. Create a Schema corresponding to the document interface.
const postSchema = new Schema<PostTypes>(
  {
    username: { type: String, required: true },
    post: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedby: [String],
    comments: [commentSchema],
    // comments: { type: [Comment] },
    // comments: { type: Types.ObjectId, ref: "Comment" },
    // updated: { type: String },
  },
  { timestamps: true }
);

const Post = model<PostTypes>("Post", postSchema);

// postSchema.pre("updateOne", function (next) {
//   const post = this;
//   post
// });

export default Post;
