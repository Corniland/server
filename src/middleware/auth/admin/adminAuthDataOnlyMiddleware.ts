import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { compose, Next } from "compose-middleware";

import bearerToken from "express-bearer-token";

const middleware = (req: Request, res: Response, next: Next) => {
  if (req.token == null) return res.sendStatus(401);

  let admin;

  try {
    admin = jwt.verify(req.token, process.env.JWT_SECRET_ADMIN);
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }

  // storing admin data in res.locals.admin
  res.locals.admin = admin;
  next();
};

const adminAuthDataOnlyMiddleware = (): express.RequestHandler => compose([bearerToken(), middleware]);

export default adminAuthDataOnlyMiddleware;
