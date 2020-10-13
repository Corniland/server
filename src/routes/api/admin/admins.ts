import express from "express";
import { AdminModel } from "../../../models/admin";
import createError from "http-errors";
const adminAdminsRouter = express.Router();

//TODO: Admin Authenticate
adminAdminsRouter.get("/", (req, res) => {
  res.send("list of all admins");
});

//TODO: Admin Authenticate
adminAdminsRouter.post("/", (req, res) => {
  res.send("create an admin");
});

//TODO: Admin Authenticate
adminAdminsRouter.get("/:adminId", (req, res) => {
  res.send("specific admin's data");
});

//TODO: Admin Authenticate
adminAdminsRouter.put("/:adminId", (req, res) => {
  res.send("update specific admin's data");
});

//TODO: Admin Authenticate
adminAdminsRouter.delete("/:adminId", async (req, res, next) => {
  try {
    //Find projects from DB
    const adminDoc = await AdminModel.deleteOne({ id: req.params.adminId });

    if (!adminDoc) return next(createError(404, "admin not found"));
    if (adminDoc !== res.locals.admin.login) return next(createError(404, "admin not found"));

    return res.json(adminDoc);
  } catch (err) {
    return next(createError(500));
  }
});

export default adminAdminsRouter;
