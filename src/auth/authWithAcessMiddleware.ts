import express from "express";
import { Request, Response } from "express";
import authDataOnlyMiddleware from "./authDataOnlyMiddleware";
import composeMiddleware, { Next } from "compose-middleware";

const compose = composeMiddleware.compose;

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
