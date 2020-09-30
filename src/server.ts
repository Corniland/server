// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

import express from "express";

import routes from "./routes/indexRoutes";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(routes);

app.get("/test", async (_req, res) => {
  res.send("wurks");
});

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));