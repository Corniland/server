import express from "express";
const adminProjectsRouter = express.Router();

//TODO: Admin Authenticate
adminProjectsRouter.get("/", (req, res) => {
  res.send("list of all users");
});

//TODO: Admin Authenticate
adminProjectsRouter.get("/:projectId", (req, res) => {
  res.send("specific project");
});

//TODO: Admin Authenticate
adminProjectsRouter.delete("/:projectId", (req, res) => {
  res.send("deleted a project");
});

export default adminProjectsRouter;
