import express from "express";
const projectRouter = express.Router();

projectRouter.get("/", (req, res) => {
  res.send("list of project");
});

//TODO: Authenticate
projectRouter.post("/", (req, res) => {
  res.send("posted projects");
});

//TODO: Authenticate, if public no need for authentication
projectRouter.get("/:projectId", (req, res) => {
  res.send("a specific project");
});

//TODO: Authenticate
projectRouter.put("/:projectId", (req, res) => {
  res.send("updated a project");
});

//TODO: Authenticate
projectRouter.delete("/:projectId", (req, res) => {
  res.send("deleted a project");
});

//TODO: Authenticate
projectRouter.post("/:projectId/member/:userId", (req, res) => {
  res.send("added a user to a project");
});

//TODO: Authenticate
projectRouter.delete("/:projectId/member/:userId", (req, res) => {
  res.send("removed a user from a project");
});

//TODO: Authenticate
projectRouter.post("/:projectId/like", (req, res) => {
  res.send("liked a project");
});

//TODO: Authenticate
projectRouter.delete("/:projectId/like", (req, res) => {
  res.send("unliked a project");
});

export default projectRouter;
