import express from "express";
import createError from "http-errors";
import { UserModel } from "../../../models/user";
const adminUsersRouter = express.Router();

//TODO: Admin Authenticate
adminUsersRouter.get("/", (req, res) => {
  res.send("list of all users");
});

//TODO: Admin Authenticate
adminUsersRouter.get("/:userId", (req, res) => {
  res.send("specific user data");
});

//TODO: Admin Authenticate
adminUsersRouter.delete("/:userId", async (req, res, next) => {
  try {
    //Find projects from DB
    const userDoc = await UserModel.deleteOne({ id: req.params.userId });

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
