import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bearerToken from "express-bearer-token";
import { compose } from "compose-middleware";

const middleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.token == null) return next(createError(401));

  let admin;

  try {
    admin = jwt.verify(req.token, process.env.JWT_SECRET_USER);
  } catch (err) {
    return next(createError(401));
  }

  // storing admin data in res.locals.admin
  res.locals.admin = admin;
  next();
};

const authDataOnlyMiddleware = (): express.RequestHandler => compose([bearerToken(), middleware]);

export default authDataOnlyMiddleware;
