import express from "express";
const adminProjectsRouter = express.Router();

adminProjectsRouter.get("/", (req, res) => {
  res.send("list of all users");
});

adminProjectsRouter.get("/:projectId", (req, res) => {
  res.send("specific project");
});

adminProjectsRouter.delete("/:projectId", (req, res) => {
  res.send("deleted a project");
});

export default adminProjectsRouter;
