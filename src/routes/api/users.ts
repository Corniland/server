import express from "express";
import authWithAcessMiddleware from "../../middleware/auth/authWithAcessMiddleware";
import authDataOnlyMiddleware from "../../middleware/auth/authDataOnlyMiddleware";

const userRouter = express.Router();

userRouter.get("/:userId", authDataOnlyMiddleware, (req, res) => {
  res.send("a specific user");
});

userRouter.put("/:userId", authWithAcessMiddleware, (req, res) => {
  res.send("updated users settings");
});

export default userRouter;
