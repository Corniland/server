import express from "express";
import { userAuthRouter } from "./user";
import { adminAuthRouter } from "./admin";

const authRouter = express.Router();

authRouter.use("/user", userAuthRouter);
authRouter.use("/admin", adminAuthRouter);

export default authRouter;
