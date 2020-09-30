// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

import express from "express";

//Routers
import adminRouter from "./routes/adminRouter";
import projectRouter from "./routes/projectRouter";
import userRouter from "./routes/userRouter";

//Authentication middleware
import authAdminMiddleware from "./auth/adminAuthMiddleware";

const PORT = process.env.PORT || 5000;

const app = express();

app.use("/api/admin", authAdminMiddleware, adminRouter);
app.use("/api/project", projectRouter);
app.use("/api/user", userRouter);

app.get("/test", async (_req, res) => {
  res.send("wurks");
});

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
