import express from "express";
import { validateSignupData, validateLoginData } from "../../util/validators";
//import { User } from "../models/user";

export const userAuthRouter = express.Router();

export interface NewUserData {
  email: string;
  username: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

//user register route
userAuthRouter.post("/register", (req, res) => {
  const newUser: NewUserData = { email: req.body.email, username: req.body.username, password: req.body.password };

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  //TODO: checking if user doesn't already exist in DB
  //TODO: Gen salt and store it together with the hashed password
  //TODO: add user to DB
});

//user login route
userAuthRouter.post("/login", (req, res) => {
  const userLoginData: UserLoginData = { email: req.body.email, password: req.body.password };

  const { valid, errors } = validateLoginData(userLoginData);

  if (!valid) return res.status(400).json(errors);

  //TODO: Authenticate user
  //TODO: Return auth token
});

//user whomai route
userAuthRouter.post("/me", (req, res) => {
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
