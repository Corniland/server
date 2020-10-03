import express from "express";
import { Request, Response } from "express";
import adminAuthDataOnlyMiddleware from "./adminAuthDataOnlyMiddleware";
import { compose, Next } from "compose-middleware";

const adminAuthWithAccessMiddleware = (): express.RequestHandler => {
  return compose([
    adminAuthDataOnlyMiddleware,
    (_req: Request, res: Response, next: Next): void => {
      if (res.locals.admin) next();
      res.status(403).json({ error: `Unauthorized` });
    },
  ]);
};

export default adminAuthWithAccessMiddleware;
