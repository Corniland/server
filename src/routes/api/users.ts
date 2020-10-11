import express from "express";
import authWithAcessMiddleware from "../../middleware/auth/user/authWithAcessMiddleware";
import authDataOnlyMiddleware from "../../middleware/auth/user/authDataOnlyMiddleware";
import { UserModel } from "../../models/user";

const userRouter = express.Router();

userRouter.get("/:userId", authDataOnlyMiddleware, async (req, res) => {
  const userId = req.params.userId;

  try {
    //Find user from DB
    const userDoc = await UserModel.findById(userId);
    if (!userDoc) return res.status(404).json({ error: "not found" });

    //If it's public or if authenticated user is getting his own info, send
    if (!userDoc.private_profile || res.locals.user?.username === userDoc.username) {
      return res.json({
        id: userDoc.id,
        email: userDoc.email,
        username: userDoc.username,
        liked_projects: userDoc.liked_projects,
      });
    } else {
      return res.status(403).json({ error: "Access forbidden" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
});

userRouter.put("/:userId", authWithAcessMiddleware, (req, res) => {
  res.send("updated users settings");
});

export default userRouter;
