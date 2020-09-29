import express from "express";
const adminUserRouter = express.Router();

//TODO: Admin Authenticate
adminUserRouter.get("/", (req, res) => {
  res.send("list of all users");
});

//TODO: Admin Authenticate
adminUserRouter.get("/:userId", (req, res) => {
  res.send("specific user data");
});

//TODO: Admin Authenticate
adminUserRouter.delete("/:userId", (req, res) => {
  res.send("deleted a user");
});

//TODO: Admin Authenticate
adminUserRouter.post("/:userId/ban", (req, res) => {
  res.send("banned a user");
});

//TODO: Admin Authenticate
adminUserRouter.delete("/:userId/ban", (req, res) => {
  res.send("unbanned a user");
});

export default adminUserRouter;
