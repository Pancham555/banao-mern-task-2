import { Schema, model, connect } from "mongoose";
import bcryptjs from "bcryptjs";
// 1. Create an interface representing a document in MongoDB.
interface UserTypes {
  username: string;
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<UserTypes>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  try {
    let user = this;
    if (user.isModified("password")) {
      const saltRound = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(user.password, saltRound);

      user.password = hashedPassword;
    }
    next();
  } catch (error) {
    console.log("user creating error", error);

    // let err: Error | unknown = error;
    next();
  }
});

const User = model<UserTypes>("User", userSchema);

export default User;
