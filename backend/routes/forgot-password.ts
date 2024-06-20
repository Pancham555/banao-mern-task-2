import express from "express";
import forgotPassword from "../controllers/forgot-password";
import resetPassword from "../controllers/reset-password";

const router = express.Router();

router.post("/", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
