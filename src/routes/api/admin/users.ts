import express from "express";
import createError from "http-errors";
import { UserModel } from "../../../models/user";
const adminUsersRouter = express.Router();

adminUsersRouter.get("/", async (req, res, next) => {
  try {
    //Find projects from DB
    const userDocs = await UserModel.find();

    return res.json(userDocs);
  } catch (err) {
    return next(createError(500));
  }
});

adminUsersRouter.get("/:userId", async (req, res, next) => {
  try {
    //Find projects from DB
    const userDoc = await UserModel.findById(req.params.userId);

    if (!userDoc) return next(createError(404, "user not found"));

    return res.json(userDoc);
  } catch (err) {
    return next(createError(500));
  }
});

//TODO: Admin Authenticate
adminUsersRouter.delete("/:userId", async (req, res, next) => {
  try {
    //Find projects from DB
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const userDoc = await UserModel.deleteOne({ _id: req.params.userId });

    if (!userDoc) return next(createError(404, "user not found"));

    return res.json(userDoc);
  } catch (err) {
    return next(createError(500));
  }
});

//TODO: Admin Authenticate
adminUsersRouter.post("/:userId/ban", async (req, res, next) => {
  try {
    //Find projects from DB
    const userDoc = await UserModel.findById(req.params.userId);

    if (!userDoc) return next(createError(404, "user not found"));

    userDoc.banned = true;
    await userDoc.save();

    return res.json(userDoc);
  } catch (err) {
    return next(createError(500));
  }
});

//TODO: Admin Authenticate
adminUsersRouter.delete("/:userId/ban", async (req, res, next) => {
  try {
    //Find projects from DB
    const userDoc = await UserModel.findById(req.params.userId);

    if (!userDoc) return next(createError(404, "user not found"));

    userDoc.banned = false;
    await userDoc.save();

    return res.json(userDoc);
  } catch (err) {
    return next(createError(500));
  }
});

export default adminUsersRouter;
