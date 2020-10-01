import express from "express";

import admins from "./admins";
import projects from "./projects";
import users from "./users";

import authAdminMiddleware from "../../../auth-utils/adminAuthMiddleware";

const router = express.Router();

router.use("/admins", authAdminMiddleware, admins);
router.use("/projects", projects);
router.use("/users", users);

export default router;
