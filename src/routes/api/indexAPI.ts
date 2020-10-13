import express from "express";

import apiAdminRouter from "./admin/indexAPIAdmin";
import adminAuthWithAccessMiddleware from "../../middleware/auth/admin/adminAuthWithAccessMiddleware";
import users from "./users";
import projects from "./projects";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bearerToken = require("express-bearer-token");

const router = express.Router();

// API for Admin Panel
router.use("/admin", adminAuthWithAccessMiddleware, apiAdminRouter);

// Normal API for normal Users
router.use("/users", users);
router.use("/projects", projects);

router.use(bearerToken());

export default router;
