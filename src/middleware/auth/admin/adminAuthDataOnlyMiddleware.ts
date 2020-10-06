// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

import { Request, Response } from "express";
import { Next } from "compose-middleware";
import jwt from "jsonwebtoken";

const adminAuthDataOnlyMiddleware = async (req: Request, res: Response, next: Next) => {
  // parsing JWT token.
  const authHeader = req.headers["authorization"];
  const adminAccessToken = authHeader && authHeader?.split(" ")[1];

  if (adminAccessToken == null) return res.sendStatus(401);

  let admin;

  try {
    admin = jwt.verify(adminAccessToken, process.env.JWT_SECRET_ADMIN);
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }

  // storing admin data in res.locals.admin
  res.locals.admin = admin;
  next();
};

export default adminAuthDataOnlyMiddleware;
