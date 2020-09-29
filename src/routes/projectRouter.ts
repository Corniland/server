import express from "express";
const projectRouter = express.Router();

projectRouter.get("/", (req, res) => {
  res.send("list of project");
});

projectRouter.post("/", (req, res) => {
  res.send("posted projects");
});

projectRouter.get("/:projectId", (req, res) => {
  res.send("a specific project");
});

projectRouter.put("/:projectId", (req, res) => {
  res.send("updated a project");
});

projectRouter.delete("/:projectId", (req, res) => {
  res.send("deleted a project");
});

projectRouter.post("/:projectId/member/:userId", (req, res) => {
  res.send("added a user to a project");
});

projectRouter.delete("/:projectId/member/:userId", (req, res) => {
  res.send("removed a user from a project");
});

projectRouter.post("/:projectId/like", (req, res) => {
  res.send("liked a project");
});

projectRouter.delete("/:projectId/like", (req, res) => {
  res.send("unliked a project");
});

export default projectRouter;
