import express from "express";
import { AdminModel } from "../../../models/admin";
import createError from "http-errors";
const adminAdminsRouter = express.Router();

adminAdminsRouter.get("/", async (req, res, next) => {
  try {
    //Find projects from DB
    const adminDocs = await AdminModel.find();

    return res.json(adminDocs);
  } catch (err) {
    return next(createError(500));
  }
});

adminAdminsRouter.post("/", (req, res, next) => {
  res.send("create an admin");
});

adminAdminsRouter.get("/:adminId", async (req, res, next) => {
  try {
    //Find projects from DB
    const adminDoc = await AdminModel.findById(req.params.userId);

    if (!adminDoc) return next(createError(404, "admin not found"));

    return res.json(adminDoc);
  } catch (err) {
    return next(createError(500));
  }
});

adminAdminsRouter.put("/:adminId", (req, res, next) => {
  res.send("update specific admin's data");
});

adminAdminsRouter.delete("/:adminId", (req, res, next) => {
  res.send("delete a specific admin");
});

export default adminAdminsRouter;
