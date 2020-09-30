import express from "express";
const adminAdminsRouter = express.Router();

//TODO: Admin Authenticate
adminAdminsRouter.get("/", (req, res) => {
  res.send("list of all admins");
});

//TODO: Admin Authenticate
adminAdminsRouter.post("/", (req, res) => {
  res.send("create an admin");
});

//TODO: Admin Authenticate
adminAdminsRouter.get("/:adminId", (req, res) => {
  res.send("specific admin's data");
});

//TODO: Admin Authenticate
adminAdminsRouter.put("/:adminId", (req, res) => {
  res.send("update specific admin's data");
});

//TODO: Admin Authenticate
adminAdminsRouter.delete("/:adminId", (req, res) => {
  res.send("delete a specific admin");
});

export default adminAdminsRouter;
