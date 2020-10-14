import express from "express";
import { ProjectModel } from "../../models/project";
import createError from "http-errors";
import { needUserAuth, populateUser } from "../../middleware/auth/user";
import { UserModel } from "../../models/user";

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

projectRouter.delete("/:projectId", needUserAuth, async (req, res, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.projectId);

    if (!projectDoc) return next(createError(404, "project not found"));
    if (projectDoc.owner !== res.locals.user.id) return next(createError(403));

    await projectDoc.deleteOne();

    return res.sendStatus(200);
  } catch (err) {
    return next(createError(500, err));
  }
});

projectRouter.post("/:projectId/member/:userId", needUserAuth, (req, res) => {
  res.send("added a user to a project");
});

projectRouter.delete("/:projectId/member/:userId", needUserAuth, (req, res) => {
  res.send("removed a user from a project");
});

projectRouter.post("/:projectId/like", needUserAuth, async (req, res, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.projectId);
    const userDoc = await UserModel.findById(res.locals.user.id);

    if (!projectDoc) return next(createError(404, "project not found"));
    if (userDoc?.liked_projects.includes(projectDoc.id)) return next(createError(400, "project already liked"));

    //Check if the project is public or not
    const members = projectDoc.members;
    members?.push(projectDoc.owner);
    if (!projectDoc.published && !members?.includes(userDoc?.id)) return next(createError(403));

    userDoc?.liked_projects.push(projectDoc.id); //add project to the list of user's liked projects
    projectDoc.likes = <number>projectDoc.likes + 1; //increase like count on the project

    userDoc?.save();
    projectDoc.save();
  } catch (err) {
    return next(createError(500, err));
  }
});

projectRouter.delete("/:projectId/like", needUserAuth, async (req, res, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.projectId);
    const userDoc = await UserModel.findById(res.locals.user.id);

    if (!projectDoc) return next(createError(404, "project not found"));
    if (!userDoc?.liked_projects.includes(projectDoc.id)) return next(createError(400, "project already unliked"));

    //Check if the project is public or not
    const members = projectDoc.members;
    members?.push(projectDoc.owner);
    if (!projectDoc.published && !members?.includes(userDoc?.id)) return next(createError(403));

    userDoc?.liked_projects.filter((projectId) => projectId !== projectDoc.id); //removed project to the list of user's liked projects
    projectDoc.likes = <number>projectDoc.likes - 1; //decrease like count on the project

    userDoc?.save();
    projectDoc.save();
  } catch (err) {
    return next(createError(500, err));
  }
});

export default projectRouter;
