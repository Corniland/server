import express from "express";
const userRouter = express.Router();

userRouter.get("/:userId", (req, res) => {
  res.send("a specific user");
});

userRouter.put("/:userId", (req, res) => {
  res.send("updated users settings");
});

export default userRouter;
