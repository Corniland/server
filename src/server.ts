// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

import express from "express";

import routes from "./routes/indexRoutes";

const app = express();

app.use(routes);

app.listen(process.env.PORT, () => console.log(`Server running at port: ${process.env.PORT}`));
