import express from "express";
import createError from "http-errors";
import bcrypt from "bcrypt";

import { UserModel } from "../../models/user";
import { populateUser, needUserAuth } from "../../middleware/auth/user";

const userRouter = express.Router();

userRouter.get("/:userId", populateUser, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    //Find the user in db
    const userDoc = await UserModel.findById(userId);
    if (!userDoc) return next(createError(404));
    if (userDoc.private_profile) return next(createError(404, "This user profile is private"));

    res.status(200).json({
      id: userDoc.id,
      username: userDoc.username,
      liked_projects: userDoc.liked_projects,
    });
  } catch (err) {
    return next(createError(500));
  }
});

userRouter.put("/me", needUserAuth, async (req, res: express.Response, next) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  res.locals.user = res.locals.user!;

  try {
    if (req.body.username) {
      if (await UserModel.exists({ username: req.body.username })) return next(createError(400, "The username is already taken"));
      res.locals.user.username = req.body.username;
    }

    if (req.body.password) res.locals.user.password = await bcrypt.hash(req.body.password, res.locals.user.password_salt);

    if (req.body.private_profile) res.locals.user.private_profile = req.body.private_profile;

    await res.locals.user.save();

    res.json({ email: res.locals.user.email, username: res.locals.user.username });
  } catch (err) {
    return next(createError(500));
  }
});

export default userRouter;
