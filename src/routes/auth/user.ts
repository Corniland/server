// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

import express from "express";
import { validateSignupData, validateLoginData } from "../../util/validators";
import { UserModel } from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

//user register route
userAuthRouter.post("/register", async (req, res) => {
  const newUser: UserRegisterData = { email: req.body.email, username: req.body.username, password: req.body.password };

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  //checking if user doesn't already exist in DB
  const userUsernameDoc = await UserModel.findOne({ username: newUser.username }).exec();
  const userEmailDoc = await UserModel.findOne({ email: newUser.email }).exec();
  if (userUsernameDoc) return res.status(400).json({ username: "this username is already taken" });
  if (userEmailDoc) return res.status(400).json({ email: "this email is already taken" });

  // Gen salt and store it together with the hashed password
  const userPasswordSalt = await bcrypt.genSalt(10);
  const hashedPassword = <string>await bcrypt.hash(newUser.password, userPasswordSalt).catch((err) => console.log(err));

  // Add user to DB
  const _newUserModel = (
    await UserModel.create({
      email: newUser.email,
      username: newUser.username,
      password: hashedPassword,
      password_salt: userPasswordSalt,
      private_profile: false,
      banned: false,
    })
  ).save();

  // Return auth token;
  let accessToken;
  const TOKEN = process.env.ACCESS_TOKEN_SECRET;
  TOKEN ? (accessToken = jwt.sign({ email: newUser.email, username: newUser.username }, TOKEN)) : console.log("No secret access token in env");

  res.status(200).json({ jwt: `Bearer ${accessToken}` });
});

//user login route
userAuthRouter.post("/login", async (req, res) => {
  const userLoginData: UserLoginData = { email: req.body.email, password: req.body.password };

  const { valid, errors } = validateLoginData(userLoginData);

  if (!valid) return res.status(400).json(errors);

  //TODO: Authenticate user

  //checking if user doesn't already exist in DB
  const userEmailDoc = await UserModel.findOne({ email: userLoginData.email }).exec();
  if (!userEmailDoc) return res.status(400).json({ login: "email or password is incorrect" });
  else if (!(await userEmailDoc.checkPassword(userLoginData.password))) {
    return res.status(400).json({ login: "email or password is incorrect" });
  }

  // Return auth token;
  let accessToken;
  const TOKEN = process.env.ACCESS_TOKEN_SECRET;
  TOKEN ? (accessToken = jwt.sign({ email: userEmailDoc.email, username: userEmailDoc.username }, TOKEN)) : console.log("No secret access token in env");

  res.status(200).json({ jwt: `Bearer ${accessToken}` });
});

//user whomai route
userAuthRouter.post("/me", (_req, _res) => {
  //TODO: Decrypt JWT token to get some user data
  //TODO: look for the user in db
  //TODO  return data
  /*
    {
    "email": "foo@example.com",
    "login": "FooBar",
    "private_profile": false,
    "liked_projects": ["5f6e96852f1bc609ad3c55de", "5f6e98d4c4bb195ebf77a6d2"],
    "banned": false
    }
    */
});
