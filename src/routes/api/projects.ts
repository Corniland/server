import express from "express";
import { ProjectModel } from "../../models/project";
import createError from "http-errors";
import { needUserAuth, populateUser } from "../../middleware/auth/user";

const projectRouter = express.Router();

projectRouter.get("/", async (req, res, next) => {
  try {
    //Find projects from DB
    const projectDocs = await ProjectModel.find({ published: true });

    return res.json(projectDocs);
  } catch (err) {
    return next(createError(500));
  }
});

projectRouter.get("/:projectId", populateUser, async (req, res: express.Response, next) => {
  try {
    //Find projects from DB
    const project = await ProjectModel.findById(req.params.projectId);

    if (!project) return next(createError(404));

    const members = project.members;
    members?.push(project.owner);
    if (!project.published && !members?.includes(res.locals.user?._id)) return next(createError(403));

    return res.json(project);
  } catch (err) {
    return next(createError(500));
  }
});

projectRouter.post("/", needUserAuth, (req, res) => {
  res.send("posted a project");
});

projectRouter.put("/:projectId", needUserAuth, (req, res) => {
  res.send("updated a project");
});

projectRouter.delete("/:projectId", needUserAuth, (req, res) => {
  res.send("deleted a project");
});

projectRouter.post("/:projectId/member/:userId", needUserAuth, (req, res) => {
  res.send("added a user to a project");
});

projectRouter.delete("/:projectId/member/:userId", needUserAuth, (req, res) => {
  res.send("removed a user from a project");
});

projectRouter.post("/:projectId/like", needUserAuth, (req, res) => {
  res.send("liked a project");
});

projectRouter.delete("/:projectId/like", needUserAuth, (req, res) => {
  res.send("unliked a project");
});

export default projectRouter;
