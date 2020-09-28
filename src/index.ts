import authRouter from "./routes/AuthRoute/authRouter";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

import express from "express";

const PORT = process.env.PORT || 5000;

const app = express();

//Auth route
app.use("/auth", authRouter);

app.get("/", (_req, res) => {
  res.send("Wurks");
});

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
