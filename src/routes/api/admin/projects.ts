import express from "express";
import { ProjectModel } from "../../../models/project";
import createError from "http-errors";
const adminProjectsRouter = express.Router();

//TODO: Admin Authenticate
adminProjectsRouter.get("/", (req, res) => {
  res.send("list of all users");
});

//TODO: Admin Authenticate
adminProjectsRouter.get("/:projectId", (req, res) => {
  res.send("specific project");
});

//TODO: Admin Authenticate
adminProjectsRouter.delete("/:projectId", async (req, res, next) => {
  try {
    //Find projects from DB
    const projectDoc = await ProjectModel.deleteOne({ id: req.params.projectId });

    if (!projectDoc) return next(createError(404, "project not found"));

    return res.json(projectDoc);
  } catch (err) {
    return next(createError(500));
  }
});

export default adminProjectsRouter;
