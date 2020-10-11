import express, { Request, Response, NextFunction } from "express";
import authDataOnlyMiddleware from "./authDataOnlyMiddleware";
import { compose } from "compose-middleware";
import createError from "http-errors";

const middleware = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user) next();
  return next(createError(403));
};

const authWithAcessMiddleware = (): express.RequestHandler => {
  return compose([authDataOnlyMiddleware, middleware]);
};

export default authWithAcessMiddleware;
