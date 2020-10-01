import { Request, Response } from "express";
import { Next } from "compose-middleware";

const authDataOnlyMiddleware = (_req: Request, _res: Response, next: Next): void => {
  next();
  //TODO: parsing JWT token.
  //TODO: storing user data in res.locals.user
};

export default authDataOnlyMiddleware;
