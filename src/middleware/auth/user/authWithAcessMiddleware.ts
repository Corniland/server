import express, { Request, Response, NextFunction } from "express";
import authDataOnlyMiddleware from "./authDataOnlyMiddleware";
import { compose } from "compose-middleware";

const middleware = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user) next();
  res.status(403).json({ error: `Unauthorized` });
};

const authWithAcessMiddleware = (): express.RequestHandler => {
  return compose([authDataOnlyMiddleware, middleware]);
};

export default authWithAcessMiddleware;
