import express, { Request, Response, NextFunction } from "express";
import adminAuthDataOnlyMiddleware from "./adminAuthDataOnlyMiddleware";
import { compose } from "compose-middleware";

const middleware = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.admin) next();
  res.status(403).json({ error: `Unauthorized` });
};

const adminAuthWithAccessMiddleware = (): express.RequestHandler => {
  return compose([adminAuthDataOnlyMiddleware, middleware]);
};

export default adminAuthWithAccessMiddleware;
