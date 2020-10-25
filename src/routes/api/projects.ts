import express from "express";
import createError from "http-errors";
import { Types } from "mongoose";
import rateLimit from "express-rate-limit";

import { ProjectModel } from "../../models/project";
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

projectRouter.post(
  "/",
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
  }),
  needUserAuth,
  async (req, res: express.Response, next) => {
    try {
      const projectTitle = req.body.title;

      if (!projectTitle) return next(createError(400, "project title must not be empty"));

      const projectDoc = new ProjectModel({
        title: projectTitle,
        short_description: " ",
        description: " ",
        status: " ",
        cover_picture_url: " ",
        published: false,
        owner: res.locals.user?._id,
        members: [],
        likes: 0,
      });

      await projectDoc.save();

      res.json(projectDoc);
    } catch (err) {
      return next(createError(500, err));
    }
  }
);

projectRouter.put("/:projectId", needUserAuth, async (req, res: express.Response, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.projectId);

    const updatedProject = req.body;

    if (!projectDoc) return next(createError(404, "project  not found"));
    if (!res.locals.user?._id.equals(<Types.ObjectId>projectDoc.owner)) return next(createError(403));

    // Store in db and save
    if (updatedProject.title) projectDoc.title = updatedProject.title;
    if (updatedProject.short_description) projectDoc.short_description = updatedProject.short_description;
    if (updatedProject.description) projectDoc.description = updatedProject.description;
    if (updatedProject.status) projectDoc.status = updatedProject.status;
    if (updatedProject.cover_picture_url) projectDoc.cover_picture_url = updatedProject.cover_picture_url;
    if (updatedProject.published) projectDoc.published = updatedProject.published;

    await projectDoc.save();

    res.json(projectDoc);
  } catch (err) {
    return next(createError(500, err));
  }
});

projectRouter.delete("/:projectId", needUserAuth, async (req, res: express.Response, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.projectId);

    if (!projectDoc) return next(createError(404, "project not found"));

    if (projectDoc?.owner !== res.locals.user?._id) return next(createError(403));

    await projectDoc.deleteOne();

    return res.sendStatus(200);
  } catch (err) {
    return next(createError(500, err));
  }
});

projectRouter.post("/:projectId/member/:userId", needUserAuth, async (req, res: express.Response, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.projectId);
    const userDoc = await UserModel.findById(req.params.userId);

    if (!projectDoc) return next(createError(404, "project  not found"));
    if (!userDoc) return next(createError(404, "user  not found"));
    if (!res.locals.user?._id.equals(<Types.ObjectId>projectDoc.owner)) return next(createError(403));
    if (projectDoc.members.includes(userDoc._id)) return next(createError(400, "User is already a member"));

    projectDoc.members?.push(userDoc.id);

    await projectDoc.save();

    res.json(projectDoc);
  } catch (err) {
    return next(createError(500, err));
  }
});

projectRouter.delete("/:projectId/member/:userId", needUserAuth, async (req, res: express.Response, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.projectId);
    const userDoc = await UserModel.findById(req.params.userId);

    if (!projectDoc) return next(createError(404, "project  not found"));
    if (!userDoc) return next(createError(404, "user  not found"));
    if (!res.locals.user?._id.equals(<Types.ObjectId>projectDoc.owner)) return next(createError(403));
    if (!projectDoc.members.includes(userDoc.id)) return next(createError(400, "User is not a member"));

    projectDoc.members = projectDoc.members?.filter((userId) => !userDoc._id.equals(<Types.ObjectId>userId)); //removed project to the list of user's liked projects
    await projectDoc.save();

    res.json(projectDoc);
  } catch (err) {
    return next(createError(500, err));
  }
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

    await userDoc?.save();
    await projectDoc.save();
    res.json(projectDoc);
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

    userDoc.liked_projects = userDoc.liked_projects.filter((projectId) => !projectDoc._id.equals(<Types.ObjectId>projectId)); //removed project to the list of user's liked projects
    projectDoc.likes = <number>projectDoc.likes - 1; //decrease like count on the project

    await userDoc?.save();
    await projectDoc.save();
    res.json(projectDoc);
  } catch (err) {
    return next(createError(500, err));
  }
});

export default projectRouter;
