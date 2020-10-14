import express from "express";
import { ProjectModel } from "../../../models/project";
import createError from "http-errors";
const adminProjectsRouter = express.Router();

adminProjectsRouter.get("/", async (_req, res, next) => {
  try {
    //Find projects from DB
    const projectDocs = await ProjectModel.find();

    return res.json(projectDocs);
  } catch (err) {
    return next(createError(500, err));
  }
});

adminProjectsRouter.get("/:id", async (req, res, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.id);

    if (!projectDoc) return next(createError(404, "project not found"));

    return res.json(projectDoc);
  } catch (err) {
    return next(createError(500, err));
  }
});

adminProjectsRouter.delete("/:id", async (req, res, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.findById(req.params.id);

    if (!projectDoc) return next(createError(404, "project not found"));
    await projectDoc.deleteOne();

    return res.sendStatus(200);
  } catch (err) {
    return next(createError(500, err));
  }
});

export default adminProjectsRouter;
