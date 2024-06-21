import { Schema, model } from "mongoose";

interface CommentTypes {
  username: string;
  comment: string;
}

// 2. Create a Schema corresponding to the document interface.
export const commentSchema = new Schema<CommentTypes>({
  username: { type: String, required: true },
  comment: { type: String, required: true },
});

const Comment = model<CommentTypes>("Comment", commentSchema);

export default Comment;
