import express from "express";

import admins from "./admins";
import projects from "./projects";
import users from "./users";

import authAdminMiddleware from "../../../middleware/auth/admin/adminAuthWithAccessMiddleware";

const router = express.Router();

router.use("/admins", authAdminMiddleware, admins);
router.use("/projects", projects);
router.use("/users", users);

export default router;
