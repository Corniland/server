import express from "express";

import apiAdminRouter from "./admin/indexAPIAdmin";

import users from "./users";
import projects from "./projects";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bearerToken = require("express-bearer-token");

const router = express.Router();

// API for Admin Panel
router.use("/admin", apiAdminRouter);

// Normal API for normal Users
router.use("/users", users);
router.use("/projects", projects);

router.use(bearerToken());

router.use("/thing", (req, res) => {
  console.log(req.token);
});

export default router;
