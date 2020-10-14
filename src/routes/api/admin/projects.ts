import express from "express";
import { ProjectModel } from "../../../models/project";
import createError from "http-errors";
const adminProjectsRouter = express.Router();

adminProjectsRouter.get("/", async (req, res, next) => {
  try {
    //Find projects from DB
    console.log("toto");
    const projectDocs = await ProjectModel.find();

    return res.json(projectDocs);
  } catch (err) {
    return next(createError(500));
  }
});

adminProjectsRouter.get("/:projectId", async (req, res, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.userId);

    if (!projectDoc) return next(createError(404, "project not found"));

    return res.json(projectDoc);
  } catch (err) {
    return next(createError(500));
  }
});

//TODO: Admin Authenticate
adminProjectsRouter.delete("/:projectId", async (req, res, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.projectId);

    if (!projectDoc) return next(createError(404, "project not found"));
    await projectDoc.deleteOne();

    return res.status(200);
  } catch (err) {
    return next(createError(500));
  }
});

export default adminProjectsRouter;
