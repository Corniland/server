// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

import os from "os";
import chalk from "chalk";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/indexRoutes";

import "./mongodb/db";

process.on("uncaughtException", async (err) => {
  console.error(`Uncaught Exception:`, err);
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

app.listen(process.env.PORT, () => {
  const networkInterfaces = Object.values(os.networkInterfaces()).reduce((newArray: os.NetworkInterfaceInfo[], a) => {
    if (a) newArray?.push(...a);
    return newArray;
  }, []);

  const currentNetInt = networkInterfaces.find((i) => {
    if (i.family === "IPv4") return i;
  });

  console.log(`
${chalk.bgGreen.black(" DONE ")} ${chalk.green("Compiled successfully")}

${chalk.green("No type errors found")}
Version: NodeJS ${chalk.bold.whiteBright(process.version)}

  Server running at:
    - Local:\t${chalk.cyan(`http://localhost:${chalk.bold(process.env.PORT)}/`)}
    - Network:\t${chalk.cyan(`http://${currentNetInt?.address}:${chalk.bold(process.env.PORT)}/`)}

  Note that the development build is not optimized.
  To create a production build, run ${chalk.cyan("npm run build")}.
`);
});
