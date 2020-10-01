import express from "express";

import apiAdminRouter from "./admin/indexAPIAdmin";

import users from "./users";
import projects from "./projects";

const router = express.Router();

// API for Admin Panel
router.use("/admin", apiAdminRouter);

// Normal API for normal Users
router.use("/users", users);
router.use("/projects", projects);

export default router;
