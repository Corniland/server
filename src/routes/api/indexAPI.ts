import express from "express";

import { needAdminAuth } from "../../middleware/auth/admin";
import { blockBannedUsers } from "../../middleware/auth/user";

import apiAdminRouter from "./admin/indexAPIAdmin";
import users from "./users";
import projects from "./projects";

const router = express.Router();

// API for Admin Panel
router.use("/admin", needAdminAuth, apiAdminRouter);

// Normal API for normal Users
router.use(blockBannedUsers);
router.use("/users", users);
router.use("/projects", projects);

export default router;
