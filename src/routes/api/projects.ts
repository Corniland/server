import express from "express";
import createError from "http-errors";
import { MongooseFilterQuery, Types } from "mongoose";
import rateLimit from "express-rate-limit";

import { Project, ProjectModel } from "../../models/project";
import { needUserAuth, populateUser } from "../../middleware/auth/user";
import { UserModel } from "../../models/user";
import { DocumentType } from "@typegoose/typegoose";

const projectRouter = express.Router();

projectRouter.get("/", populateUser, async (_req, res: express.Response, next) => {
  try {
    let query: MongooseFilterQuery<DocumentType<Project>> = {};

    if (res.locals.user) query = { $or: [{ published: true }, { owner: res.locals.user._id }, { members: res.locals.user._id }] };
    else query = { published: true };

    const projectDocs = await ProjectModel.find(query);

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

projectRouter.delete("/:id", needUserAuth, async (req, res: express.Response, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    res.locals.user = res.locals.user!;

    const project = await ProjectModel.findById(req.params.id);
    if (!project) return next(createError(404, "project not found"));

    if (!project.isOwner(res.locals.user)) return next(createError(403));

    await project.deleteOne();

    return res.sendStatus(200);
  } catch (err) {
    return next(createError(500, err));
  }
});

projectRouter.post("/:id/member/:userId", needUserAuth, async (req, res: express.Response, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    res.locals.user = res.locals.user!;

    const project = await ProjectModel.findById(req.params.id);
    if (!project) return next(createError(404, "project  not found"));

    const userToAdd = await UserModel.findById(req.params.userId);

    if (!userToAdd) return next(createError(404, "user  not found"));
    if (!project.isOwner(res.locals.user)) return next(createError(403));
    if (project.isMember(userToAdd)) return next(createError(400, "User is already a member"));

    project.addMember(userToAdd);
    await project.save();

    res.json(project);
  } catch (err) {
    return next(createError(500, err));
  }
});

projectRouter.delete("/:id/member/:userId", needUserAuth, async (req, res: express.Response, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    res.locals.user = res.locals.user!;

    const project = await ProjectModel.findById(req.params.id);
    if (!project) return next(createError(404, "project  not found"));

    const userToRemove = await UserModel.findById(req.params.userId);

    if (!userToRemove) return next(createError(404, "user  not found"));
    if (!project.isOwner(res.locals.user)) return next(createError(403));
    if (!project.isMember(userToRemove)) return next(createError(400, "User is not a member"));

    project.removeMember(userToRemove);
    await project.save();

    res.json(project);
  } catch (err) {
    return next(createError(500, err));
  }
});

projectRouter.post("/:id/like", needUserAuth, async (req, res: express.Response, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    res.locals.user = res.locals.user!;

    const project = await ProjectModel.findById(req.params.id);
    if (!project) return next(createError(404, "project not found"));

    if (res.locals.user.liked_projects.includes(project._id)) return next(createError(400, "project already liked"));

    if (!project.published && !project.isPartOfProject(res.locals.user)) return next(createError(403));

    res.locals.user.likeProject(project);

    await res.locals.user.save();
    await project.save();
    res.json(project);
  } catch (err) {
    return next(createError(500, err));
  }
});

projectRouter.delete("/:id/like", needUserAuth, async (req, res: express.Response, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    res.locals.user = res.locals.user!;

    const project = await ProjectModel.findById(req.params.id);
    if (!project) return next(createError(404, "project not found"));

    if (!res.locals.user.liked_projects.includes(project._id)) return next(createError(400, "project not liked"));

    if (!project.published && !project.isPartOfProject(res.locals.user)) return next(createError(403));

    res.locals.user.unlikeProject(project);

    await res.locals.user.save();
    await project.save();
    res.json(project);
  } catch (err) {
    return next(createError(500, err));
  }
});

export default projectRouter;
