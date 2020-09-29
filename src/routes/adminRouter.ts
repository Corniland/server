import express from "express";
import adminAdminsRouter from "./adminRouters/adminAdminsRouter";
import adminUsersRouter from "./adminRouters/adminUsersRouter";
import adminProjectsRouter from "./adminRouters/adminProjectsRouter";

const adminRouter = express.Router();

adminRouter.use("/admins", adminAdminsRouter); // api/admin/admins route
adminRouter.use("/users", adminUsersRouter); // api/admin/users route
adminRouter.use("/projects", adminProjectsRouter); //  api/admin/projects route

export default adminRouter;
