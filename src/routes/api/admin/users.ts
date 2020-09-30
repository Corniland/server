import express from "express";
const adminUsersRouter = express.Router();

//TODO: Admin Authenticate
adminUsersRouter.get("/", (req, res) => {
  res.send("list of all users");
});

//TODO: Admin Authenticate
adminUsersRouter.get("/:userId", (req, res) => {
  res.send("specific user data");
});

//TODO: Admin Authenticate
adminUsersRouter.delete("/:userId", (req, res) => {
  res.send("deleted a user");
});

//TODO: Admin Authenticate
adminUsersRouter.post("/:userId/ban", (req, res) => {
  res.send("banned a user");
});

//TODO: Admin Authenticate
adminUsersRouter.delete("/:userId/ban", (req, res) => {
  res.send("unbanned a user");
});

export default adminUsersRouter;
