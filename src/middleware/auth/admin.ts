import createHttpError from "http-errors";
import express from "express";
import jwt from "jsonwebtoken";
import { compose } from "compose-middleware";
import expressBearerToken from "express-bearer-token";
import { AdminJWTPayload, AdminModel } from "../../models/admin";

export default populateAdmin;

export function getAdminJWTPayload(bearerToken: string): AdminJWTPayload | null {
  try {
    return jwt.verify(bearerToken, process.env.JWT_SECRET_ADMIN) as AdminJWTPayload;
  } catch (err) {
    return null;
  }
}

export function isAdmin(bearerToken: string): boolean {
  return getAdminJWTPayload(bearerToken) !== null;
}

export const isAdminMiddleware: express.RequestHandler = compose([
  expressBearerToken(),
  async (req: express.Request, _res: express.Response, next: express.NextFunction): Promise<void> => {
    if (!req.token) next(createHttpError(401));
    else if (isAdmin(req.token)) return next();
    else next(createHttpError(401));
  },
]);

export const populateAdmin: express.RequestHandler = compose([
  expressBearerToken(),
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      if (req.token) {
        const payload = getAdminJWTPayload(req.token);
        const admin = await AdminModel.findById(payload?.id);
        if (!admin) throw new Error("Admin not found");
        res.locals.admin = admin;
      }
    } catch (e) {
      console.error(`Error while populating admin: `, e);
    }
    next();
  },
]);

export const needAdminAuth = compose([
  populateAdmin,
  (_req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (res.locals.admin) next();
    else next(createHttpError(401));
  },
]);
