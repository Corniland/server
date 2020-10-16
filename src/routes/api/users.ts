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
  const userId = res.locals.user?.id;
  const newUserSettings = req.body; //Retreive new settings
  //Find the user in db
  const userDoc = await UserModel.findById(userId);
  if (!userDoc) return next(createError(404));
  // Update user settings

  if (newUserSettings.username) {
    const userNewUsernameDoc = await UserModel.findOne({ username: newUserSettings.username });
    if (userNewUsernameDoc) return next(createError(400, "The username is already taken"));
  }

  try {
    let newPassword;

    if (newUserSettings.password) newPassword = await bcrypt.hash(newUserSettings.password, userDoc.password_salt);

    const newUserData = {
      username: newUserSettings.username,
      password: newPassword ? newPassword : userDoc.password,
      password_salt: userDoc.password_salt,
      private_profile: newUserSettings.private_profile ? newUserSettings.private_profile : userDoc.private_profile,
    };

    // Store in db and save
    userDoc.username = newUserSettings.username;
    userDoc.password = newUserData.password;
    userDoc.password_salt = newUserData.password_salt;
    userDoc.private_profile = newUserData.private_profile;

    await userDoc.save();

    res.json({ email: userDoc.email, username: userDoc.username });
  } catch (err) {
    return next(createError(500));
  }
});

export default userRouter;
