import express from "express";

import apiRouter from "./api/indexAPI";
import authRouter from "./auth/indexAuthAPI";

const router = express.Router();

router.use("/api", apiRouter);
router.use("/auth", authRouter);

export default router;
