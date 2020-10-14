import express from "express";
import createError from "http-errors";
import { UserModel } from "../../../models/user";
const adminUsersRouter = express.Router();

adminUsersRouter.get("/", async (_req, res, next) => {
  try {
    const userDocs = await UserModel.find({}, { password: false, password_salt: false });

    return res.json(userDocs);
  } catch (err) {
    return next(createError(500, err));
  }
});

adminUsersRouter.get("/:id", async (req, res, next) => {
  try {
    const userDoc = await UserModel.findById(req.params.id, { password: false, password_salt: false });

    if (!userDoc) return next(createError(404, "user not found"));

    return res.json(userDoc);
  } catch (err) {
    return next(createError(500, err));
  }
});

adminUsersRouter.delete("/:id", async (req, res, next) => {
  try {
    const userDoc = await UserModel.findById(req.params.id);

    if (!userDoc) return next(createError(404, "user not found"));
    await userDoc.deleteOne();

    return res.sendStatus(200);
  } catch (err) {
    return next(createError(500, err));
  }
});

adminUsersRouter.post("/:id/ban", async (req, res, next) => {
  try {
    const userDoc = await UserModel.findById(req.params.id);

    if (!userDoc) return next(createError(404, "user not found"));
    if (userDoc.banned) return next(createError(400, "user already banned"));

    userDoc.banned = true;
    await userDoc.save();

    return res.sendStatus(200);
  } catch (err) {
    return next(createError(500, err));
  }
});

adminUsersRouter.delete("/:id/ban", async (req, res, next) => {
  try {
    const userDoc = await UserModel.findById(req.params.id);

    if (!userDoc) return next(createError(404, "user not found"));
    if (!userDoc.banned) return next(createError(400, "user already not banned"));

    userDoc.banned = false;
    await userDoc.save();

    return res.sendStatus(200);
  } catch (err) {
    return next(createError(500, err));
  }
});

export default adminUsersRouter;
