import express from "express";
import mongoose, { Model } from "mongoose";
import { ProjectModel } from "./mongodb/schemas";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/test", async (_req, res) => {
  res.send("Wurks");
});

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
