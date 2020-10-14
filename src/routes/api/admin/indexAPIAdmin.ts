import express from "express";

import admins from "./admins";
import projects from "./projects";
import users from "./users";

const router = express.Router();

router.use("/admins", admins);
router.use("/projects", projects);
router.use("/users", users);

export default router;
