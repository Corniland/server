// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/indexRoutes";

import "./mongodb/db";

process.on("uncaughtException", async (err) => {
  console.log(err);
  console.error(`Uncaught Exception: ${err.stack}`);
  if (process.env.NODE_ENV === "production") return;
  console.error(`Exiting with status 1 in 3s`);
  setTimeout(() => process.exit(1), 3000);
});
process.on("unhandledRejection", async (err) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error(`Unhandled Rejection: ${(err as any).stack || err}`);
  if (process.env.NODE_ENV === "production") return;
  console.error(`Exiting with status 1 in 3s`);
  setTimeout(() => process.exit(1), 3000);
});

const app = express();

app.use(helmet());
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => console.log(`Server running at port: ${process.env.PORT}`));
