import express from "express";
const adminUserRouter = express.Router();

adminUserRouter.get("/", (req, res) => {
  res.send("list of all users");
});

adminUserRouter.get("/:userId", (req, res) => {
  res.send("specific user data");
});

adminUserRouter.delete("/:userId", (req, res) => {
  res.send("deleted a user");
});

adminUserRouter.post("/:userId/ban", (req, res) => {
  res.send("banned a user");
});

adminUserRouter.delete("/:userId/ban", (req, res) => {
  res.send("unbanned a user");
});

export default adminUserRouter;
