import express, { Request, Response, NextFunction } from "express";
import adminAuthDataOnlyMiddleware from "./adminAuthDataOnlyMiddleware";
import { compose } from "compose-middleware";
import createError from "http-errors";

const middleware = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.admin) next();
  return next(createError(403));
};

const adminAuthWithAccessMiddleware = (): express.RequestHandler => {
  return compose([adminAuthDataOnlyMiddleware, middleware]);
};

export default adminAuthWithAccessMiddleware;
