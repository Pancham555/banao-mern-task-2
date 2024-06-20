import mongoose from "mongoose";
export default async function main() {
  try {
    // @ts-ignore
    await mongoose.connect(process.env.DB_LINK);
  } catch (error) {
    console.log(error);
  }
}
