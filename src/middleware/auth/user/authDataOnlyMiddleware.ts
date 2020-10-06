// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

import { Request, Response } from "express";
import { Next } from "compose-middleware";
import jwt from "jsonwebtoken";

const authDataOnlyMiddleware = async (req: Request, res: Response, next: Next) => {
  // parsing JWT token.
  const authHeader = req.headers["authorization"];
  const userAccessToken = authHeader && authHeader?.split(" ")[1];

  if (userAccessToken == null) return res.sendStatus(401);

  let user;

  try {
    user = jwt.verify(userAccessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }

  // storing user data in res.locals.user
  res.locals.user = user;
  next();
};

export default authDataOnlyMiddleware;
