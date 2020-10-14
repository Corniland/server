import express from "express";
import createError from "http-errors";
import _ from "lodash";

import { AdminModel } from "../../../models/admin";

const adminAdminsRouter = express.Router();

adminAdminsRouter.get("/", async (_req, res, next) => {
  try {
    const admins = await AdminModel.find({}, { login: true, id: true });

    res.json(admins);
  } catch (err) {
    next(createError(500));
  }
});

adminAdminsRouter.post("/", async (req, res, next) => {
  try {
    const admin = new AdminModel();

    if (!req.body.login || !req.body.password) return next(createError(400));

    admin.login = req.body.login;
    admin.password = req.body.password;
    await admin.save();

    res.status(201).json(_.pick(admin, "login", "id"));
  } catch (err) {
    next(createError(500));
  }
});

adminAdminsRouter.get("/:id", async (req, res, next) => {
  try {
    const admin = await AdminModel.findById(req.params.id, { login: true, id: true });

    if (!admin) return next(createError(404));

    res.json(admin);
  } catch (err) {
    next(createError(500));
  }
});

adminAdminsRouter.put("/:id", async (req, res, next) => {
  try {
    const admin = await AdminModel.findById(req.params.id);

    if (!admin) return next(createError(404));

    if (req.body.login) admin.login = req.body.login;
    if (req.body.password) admin.password = req.body.password;
    await admin.save();

    res.send(_.pick(admin, "login", "id"));
  } catch (err) {
    next(createError(500));
  }
});

adminAdminsRouter.delete("/:id", async (req, res, next) => {
  try {
    const admin = await AdminModel.findById(req.params.id);

    if (!admin) return next(createError(404));

    await admin.deleteOne();

    res.sendStatus(200);
  } catch (err) {
    next(createError(500));
  }
});

export default adminAdminsRouter;
