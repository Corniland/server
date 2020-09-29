import express from "express";
const userRouter = express.Router();

//TODO: Authenticate, and let unauthenticated users use it too
userRouter.get("/:userId", (req, res) => {
  res.send("a specific user");
});

//TODO: Authenticate
userRouter.put("/:userId", (req, res) => {
  res.send("updated users settings");
});

export default userRouter;
