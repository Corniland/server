import express from "express";
import { Request, Response } from "express";
import authDataOnlyMiddleware from "./authDataOnlyMiddleware";
import { compose, Next } from "compose-middleware";

const authWithAcessMiddleware = (): express.RequestHandler => {
  return compose([
    authDataOnlyMiddleware,
    (_req: Request, res: Response, next: Next): void => {
      if (res.locals.user) next();
      res.status(403).json({ error: `Unauthorized` });
    },
  ]);
};

export default authWithAcessMiddleware;
