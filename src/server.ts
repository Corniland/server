// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

import express, { ErrorRequestHandler } from "express";

import routes from "./routes/indexRoutes";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(routes);

const errorLogger: ErrorRequestHandler = (err, _req, _res, next) => {
  console.error(err.stack);
  next(err);
};

app.use(errorLogger);

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
