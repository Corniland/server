import express from "express";
import { userAuthRouter } from "./userAuthRouter";
import { adminAuthRouter } from "./adminAuthRouter";

const authRouter = express.Router();

authRouter.use("/user", userAuthRouter);
authRouter.use("/admin", adminAuthRouter);

export default authRouter;
