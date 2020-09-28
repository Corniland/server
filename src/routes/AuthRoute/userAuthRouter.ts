import express from "express";
import { validateSignupData, validateLoginData } from "../../util/validators";

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

  //TODO: checking if user doesn't already exist in db
  //TODO: adding user to DB
});

//user login route
userAuthRouter.post("/login", (req, res) => {
  const userLoginData: UserLoginData = { email: req.body.email, password: req.body.password };

  const { valid, errors } = validateLoginData(userLoginData);

  if (!valid) return res.status(400).json(errors);

  //TODO: checking if user doesn't already exist in db and password is correct
  //TODO: getting auth token
});

//user whomai route
userAuthRouter.post("/me", (req, res) => {
  //TODO: Get new updated user data
  //TODO: Validate new data
  //TODO: Overwrite the existing data with new
  //TODO: Update the db doc
});
