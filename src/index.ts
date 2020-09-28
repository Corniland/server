import express from "express";
import mongoose from "mongoose";
import { User, Project, Admin, UserModel, ProjectModel, AdminModel } from "./mongodb/schemas";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/test", async (_req, res) => {
  res.send("wurks");
});

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
