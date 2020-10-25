import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import rateLimit from "express-rate-limit";

import { validateUserSignupData, validateUserLoginData } from "../../util/validators";
import { UserModel } from "../../models/user";
import { needUserAuth } from "../../middleware/auth/user";

export const userAuthRouter = express.Router();

export interface UserRegisterData {
  email: string;
  username: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
});

//user register route
userAuthRouter.post("/register", limiter, async (req, res, next) => {
  const newUser: UserRegisterData = { email: req.body.email, username: req.body.username, password: req.body.password };

  const { valid, errors } = validateUserSignupData(newUser);

  if (!valid) return next(createError(400, errors));

  //checking if user doesn't already exist in DB
  const userUsernameDoc = await UserModel.findOne({ username: newUser.username });
  const userEmailDoc = await UserModel.findOne({ email: newUser.email });

  if (userUsernameDoc) return next(createError(400, "this username is already taken"));
  if (userEmailDoc) return next(createError(400, "this email is already taken"));

  try {
    // Gen salt and store it together with the hashed password
    const userPasswordSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, userPasswordSalt);

    // Add user to DB
    const newUserModel = new UserModel({
      email: newUser.email,
      username: newUser.username,
      password: hashedPassword,
      password_salt: userPasswordSalt,
      private_profile: false,
      banned: false,
    });
    await newUserModel.save();

    // Return auth token;
    const accessToken = jwt.sign(newUserModel.getJWTPayload(), process.env.JWT_SECRET_USER);

    res.status(200).json({ jwt: accessToken });
  } catch (err) {
    return next(createError(500));
  }
});

//user login route
userAuthRouter.post("/login", limiter, async (req, res, next) => {
  const userLoginData: UserLoginData = { email: req.body.email, password: req.body.password };

  const { valid, errors } = validateUserLoginData(userLoginData);

  if (!valid) return next(createError(400, errors));

  // Authenticate user
  // checking if user exists in DB
  const userEmailDoc = await UserModel.findOne({ email: userLoginData.email });
  if (!userEmailDoc) return next(createError(400, "email or password is incorrect"));
  else if (!(await userEmailDoc.checkPassword(userLoginData.password))) {
    return next(createError(400, "email or password is incorrect"));
  }
  try {
    // Return auth token;
    const accessToken = jwt.sign(userEmailDoc.getJWTPayload(), process.env.JWT_SECRET_USER);

    res.status(200).json({ jwt: accessToken });
  } catch (err) {
    return next(createError(500));
  }
});

//user whomai route
userAuthRouter.get("/me", needUserAuth, async (req, res, next) => {
  try {
    const userDoc = await UserModel.findOne({ username: res.locals.user.username }); // look for the user in db

    // return data
    res.status(200).json({
      id: userDoc?.id,
      email: userDoc?.email,
      username: userDoc?.username,
      private_profile: userDoc?.private_profile,
      liked_projects: userDoc?.liked_projects,
    });
  } catch (err) {
    return next(createError(500));
  }
});
