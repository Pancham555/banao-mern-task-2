import express from "express";
import logout from "../controllers/logout";

const router = express.Router();

router.post("/", logout);

export default router;
