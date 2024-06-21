import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import login from "./routes/login";
import register from "./routes/register";
import logout from "./routes/logout";
import checkAuth from "./routes/check-auth";
import forgetPassword from "./routes/forgot-password";
import posts from "./routes/posts";
import db from "./db/connect";

dotenv.config();

db().then(() => {
  console.log("DB Connected successfully");
});

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// app.get("/", (req: Request, res: Response) => {
//   res.sendFile(__dirname + "/views/index.html");
// });

app.use("/api/auth/login", login);
app.use("/api/auth/register", register);
app.use("/api/auth/forgot-password", forgetPassword);
app.use("/api/auth/logout", logout);
app.use("/api/check-auth", checkAuth);
app.use("/api/posts", posts);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
