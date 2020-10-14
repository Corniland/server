import createHttpError from "http-errors";
import express from "express";
import jwt from "jsonwebtoken";
import { compose } from "compose-middleware";
import expressBearerToken from "express-bearer-token";

import { UserJWTPayload, UserModel } from "../../models/user";

export function getUserJWTPayload(bearerToken: string): UserJWTPayload | null {
  try {
    return jwt.verify(bearerToken, process.env.JWT_SECRET_USER) as UserJWTPayload;
  } catch (err) {
    return null;
  }
}

export function isUser(bearerToken: string): boolean {
  return getUserJWTPayload(bearerToken) !== null;
}

export const isUserMiddleware: express.RequestHandler = compose([
  expressBearerToken(),
  async (req: express.Request, _res: express.Response, next: express.NextFunction): Promise<void> => {
    if (!req.token) next(createHttpError(401));
    else if (isUser(req.token)) return next();
    else next(createHttpError(401));
  },
]);

export const populateUser: express.RequestHandler = compose([
  expressBearerToken(),
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      if (req.token) {
        const payload = getUserJWTPayload(req.token);
        const user = await UserModel.findById(payload?.id);
        if (!user) throw new Error("User not found");
        res.locals.user = user;
      }
    } catch (e) {
      console.error(`Error while populating user: `, e);
    }
    next();
  },
]);

export const needUserAuth = compose([
  populateUser,
  (_req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (res.locals.user) next();
    else next(createHttpError(401));
  },
]);
