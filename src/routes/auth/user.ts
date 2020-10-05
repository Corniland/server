import express from "express";
import { validateUserSignupData, validateUserLoginData } from "../../util/validators";
import { UserModel } from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authDataOnlyMiddleware from "../../middleware/auth/user/authDataOnlyMiddleware";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config();

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
  try {
    const newUser: UserRegisterData = { email: req.body.email, username: req.body.username, password: req.body.password };

    const { valid, errors } = validateUserSignupData(newUser);

    if (!valid) return res.status(400).json(errors);

    //checking if user doesn't already exist in DB
    const userUsernameDoc = await UserModel.findOne({ username: newUser.username }).exec();
    const userEmailDoc = await UserModel.findOne({ email: newUser.email }).exec();
    if (userUsernameDoc) return res.status(400).json({ username: "this username is already taken" });
    if (userEmailDoc) return res.status(400).json({ email: "this email is already taken" });

    // Gen salt and store it together with the hashed password
    const userPasswordSalt = await bcrypt.genSalt(10);
    const hashedPassword = <string>await bcrypt.hash(newUser.password, userPasswordSalt);

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
  } catch (err) {
    console.log(err);
  }
});

//user login route
userAuthRouter.post("/login", async (req, res) => {
  try {
    const userLoginData: UserLoginData = { email: req.body.email, password: req.body.password };

    const { valid, errors } = validateUserLoginData(userLoginData);

    if (!valid) return res.status(400).json(errors);

    // Authenticate user

    // checking if user exists in DB
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
  } catch (err) {
    console.log(err);
  }
});

//user whomai route
userAuthRouter.post("/me", authDataOnlyMiddleware, async (req, res) => {
  try {
    const userDoc = await UserModel.findOne({ username: res.locals.user.username }).exec(); // look for the user in db

    // return data
    res.status(200).json({
      email: userDoc?.email,
      username: userDoc?.username,
      private_profile: userDoc?.private_profile,
      liked_projects: userDoc?.liked_projects,
      banned: userDoc?.banned,
    });
  } catch (err) {
    console.log(err);
  }
});
