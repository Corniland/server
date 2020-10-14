import express from "express";
import { AdminModel } from "../../models/admin";
import { validateAdminLoginData } from "../../util/validators";
import jwt from "jsonwebtoken";
import createError from "http-errors";

export const adminAuthRouter = express.Router();

export interface AdminLoginData {
  login: string;
  password: string;
}

//admin login route
adminAuthRouter.post("/login", async (req, res, next) => {
  const adminLoginData: AdminLoginData = { login: req.body.login, password: req.body.password };

  const { valid, errors } = validateAdminLoginData(adminLoginData);

  if (!valid) return next(createError(400, errors));

  // Authenticate user
  try {
    //checking if the admin exists in DB
    const adminLoginDoc = await AdminModel.findOne({ login: adminLoginData.login });
    if (!adminLoginDoc) return next(createError(400, "login or password is incorrect"));
    else if (!(await adminLoginDoc.checkPassword(adminLoginData.password))) {
      return next(createError(400, "login or password is incorrect"));
    }

    // Return auth token;
    const accessToken = jwt.sign(adminLoginDoc.getJWTPayload(), process.env.JWT_SECRET_ADMIN);

    res.status(200).json({ jwt: `Bearer ${accessToken}` });
  } catch (err) {
    return next(createError(500));
  }
});

//admin whoami route
adminAuthRouter.post("/me", async (req, res, next) => {
  try {
    const adminDoc = await AdminModel.findOne({ login: res.locals.user.login }); // look for the user in db

    // return data
    res.status(200).json({
      login: adminDoc?.login,
    });
  } catch (err) {
    return next(createError(500));
  }
});
