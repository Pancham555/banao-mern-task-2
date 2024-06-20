import express, { Request, Response } from "express";
import login from "../controllers/login";

const router = express.Router();

router.post("/", login);

export default router;
