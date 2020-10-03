import express from "express";
import authWithAcessMiddleware from "../../middleware/auth/user/authWithAcessMiddleware";
import authDataOnlyMiddleware from "../../middleware/auth/user/authDataOnlyMiddleware";

const projectRouter = express.Router();

projectRouter.get("/", (req, res) => {
  res.send("list of projects");
});

projectRouter.get("/:projectId", authDataOnlyMiddleware, (req, res) => {
  res.send("a specific project");
});

projectRouter.post("/", authWithAcessMiddleware, (req, res) => {
  res.send("posted a project");
});

projectRouter.get("/:projectId", authDataOnlyMiddleware, (req, res) => {
  res.send("a specific project");
});

projectRouter.put("/:projectId", authWithAcessMiddleware, (req, res) => {
  res.send("updated a project");
});

projectRouter.delete("/:projectId", authWithAcessMiddleware, (req, res) => {
  res.send("deleted a project");
});

projectRouter.post("/:projectId/member/:userId", authWithAcessMiddleware, (req, res) => {
  res.send("added a user to a project");
});

projectRouter.delete("/:projectId/member/:userId", authWithAcessMiddleware, (req, res) => {
  res.send("removed a user from a project");
});

projectRouter.post("/:projectId/like", authWithAcessMiddleware, (req, res) => {
  res.send("liked a project");
});

projectRouter.delete("/:projectId/like", authWithAcessMiddleware, (req, res) => {
  res.send("unliked a project");
});

export default projectRouter;
