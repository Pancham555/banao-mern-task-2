import express from "express";

import loggedIn from "../middleware/logged-in";

const router = express.Router();

router.get("/", loggedIn);

export default router;
