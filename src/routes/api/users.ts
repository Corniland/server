import express from "express";
import authWithAcessMiddleware from "../../middleware/auth/user/authWithAcessMiddleware";
import authDataOnlyMiddleware from "../../middleware/auth/user/authDataOnlyMiddleware";
import { UserModel } from "../../models/user";
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.get("/:userId", authDataOnlyMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    //Find the user in db
    const userDoc = await UserModel.findById(userId);
    if (!userDoc) return res.status(404).json({ error: "user doesn't exist" });
    if (userDoc.private_profile) res.status(200).json({ user: "This user profile is public" });

    res.status(200).json({
      id: userDoc.id,
      username: userDoc.username,
      liked_projects: userDoc.liked_projects,
    });
  } catch (err) {
    console.log(err);
  }
});

userRouter.put("/:userId", authWithAcessMiddleware, async (req, res) => {
  const userId = req.params.userId;
  const newUserSettings = req.body; //Retreive new settings
  //Find the user in db
  const userDoc = await UserModel.findById(userId);
  if (!userDoc) return res.status(404).json({ error: "user doesn't exist" });
  // Update user settings

  if (newUserSettings.username) {
    const userNewUsernameDoc = await UserModel.findOne({ username: newUserSettings.username });
    if (userNewUsernameDoc) res.status(400).json({ error: "The username is already taken" });
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

    //TODO: Store in db and save
    userDoc.username = newUserSettings.username;
    userDoc.password = newUserData.password;
    userDoc.password_salt = newUserData.password_salt;
    userDoc.private_profile = newUserData.private_profile;

    await userDoc.save();

    res.status(200).json({ email: userDoc.email, username: userDoc.username });
  } catch (err) {
    console.log(err);
  }
});

export default userRouter;
