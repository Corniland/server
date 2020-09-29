import express from "express";
const adminAdminsRouter = express.Router();

adminAdminsRouter.get("/", (req, res) => {
  res.send("list of all admins");
});

adminAdminsRouter.post("/", (req, res) => {
  res.send("create an admin");
});

adminAdminsRouter.get("/:adminId", (req, res) => {
  res.send("specific admin's data");
});

adminAdminsRouter.put("/:adminId", (req, res) => {
  res.send("update specific admin's data");
});

adminAdminsRouter.delete("/:adminId", (req, res) => {
  res.send("delete a specific admin");
});

export default adminAdminsRouter;
