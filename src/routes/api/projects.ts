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

projectRouter.get("/:projectId", populateUser, async (req, res, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.projectId, { published: true });

    if (!projectDoc) return next(createError(404, "project not found"));

    const members = projectDoc.members;
    members?.push(projectDoc.owner);
    if (!projectDoc.published && !members?.includes(res.locals.user._id)) return next(createError(403));

    return res.json(projectDoc);
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
