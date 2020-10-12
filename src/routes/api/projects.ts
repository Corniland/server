import express from "express";
import authWithAcessMiddleware from "../../middleware/auth/user/authWithAcessMiddleware";
import authDataOnlyMiddleware from "../../middleware/auth/user/authDataOnlyMiddleware";
import { Project, ProjectModel } from "../../models/project";
import createError from "http-errors";
import { Ref } from "@typegoose/typegoose";
import { User } from "../../models/user";
import { Types } from "mongoose";

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

projectRouter.get("/:projectId", authDataOnlyMiddleware, async (req, res, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.projectId, { published: true });

    if (!projectDoc) return next(createError(404, "project not found"));

    const members: Types.ObjectId[] = <Types.ObjectId[]>projectDoc.members;
    members.push(<Types.ObjectId>projectDoc.owner);
    if (!projectDoc.published && !members.includes(<Types.ObjectId>res.locals.user)) return next(createError(403));

    return res.json(projectDoc);
  } catch (err) {
    return next(createError(500));
  }
});

projectRouter.post("/", authWithAcessMiddleware, (req, res) => {
  res.send("posted a project");
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
