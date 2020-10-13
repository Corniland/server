import express from "express";
import { UserModel } from "../../../models/user";
import createError from "http-errors";

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

adminUsersRouter.delete("/:userId", (req, res, next) => {
  res.send("deleted a user");
});

adminUsersRouter.post("/:userId/ban", (req, res, next) => {
  res.send("banned a user");
});

adminUsersRouter.delete("/:userId/ban", (req, res, next) => {
  res.send("unbanned a user");
});

export default adminUsersRouter;
