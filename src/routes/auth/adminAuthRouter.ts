import express from "express";

export const adminAuthRouter = express.Router();

//admin login route
adminAuthRouter.post("/login", (req, res) => {
  res.send("admin login");
});

//admin whoami route
adminAuthRouter.post("/me", (req, res) => {
  res.send("admin data");
});
