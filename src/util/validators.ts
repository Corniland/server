import { UserRegisterData, UserLoginData } from "../routes/auth/user";
import { AdminLoginData } from "../routes/auth/admin";
import { User } from "../models/user";

export interface ValidationErrors {
  errors: {
    login?: string;
    email?: string;
    password?: string;
    username?: string;
  };
  valid: boolean;
}

const isEmpty = (stringVar: string) => {
  return stringVar.trim() === ``;
};

const isEmail = (email: string) => {
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(emailRegEx);
};

export const validateUserSignupData = (signupData: UserRegisterData): ValidationErrors => {
  const returnErrors: ValidationErrors = {
    errors: {},
    valid: false,
  };

  if (isEmpty(signupData.email)) returnErrors.errors.email = `Must not be empty`;
  else if (!isEmail(signupData.email)) returnErrors.errors.email = `Must be a valid email address`;

  if (isEmpty(signupData.password)) returnErrors.errors.password = `Must not be empty`;
  if (isEmpty(signupData.username)) returnErrors.errors.username = `Must not be empty`;

  returnErrors.valid = Object.keys(returnErrors.errors).length === 0;

  return returnErrors;
};

export const validateUserLoginData = (userLoginData: UserLoginData): ValidationErrors => {
  const returnErrors: ValidationErrors = {
    errors: {},
    valid: false,
  };

  if (isEmpty(userLoginData.email)) returnErrors.errors.email = `Must not be empty`;
  if (isEmpty(userLoginData.password)) returnErrors.errors.password = `Must not be empty`;

  returnErrors.valid = Object.keys(returnErrors.errors).length === 0;

  return returnErrors;
};

export const validateAdminLoginData = (adminLoginData: AdminLoginData): ValidationErrors => {
  const returnErrors: ValidationErrors = {
    errors: {},
    valid: false,
  };

  if (isEmpty(adminLoginData.login)) returnErrors.errors.login = `Must not be empty`;
  if (isEmpty(adminLoginData.password)) returnErrors.errors.password = `Must not be empty`;

  returnErrors.valid = Object.keys(returnErrors.errors).length === 0;

  return returnErrors;
};
