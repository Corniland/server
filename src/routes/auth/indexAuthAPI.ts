import express from "express";
import { adminAuthRouter } from "./admin";
import { userAuthRouter } from "./user";

const authRouter = express.Router();

authRouter.use("/user", userAuthRouter);
authRouter.use("/admin", adminAuthRouter);

export default authRouter;
