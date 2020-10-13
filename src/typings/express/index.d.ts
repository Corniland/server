import "express";
import { DocumentType } from "@typegoose/typegoose";

import { User } from "../../models/User";
import { Admin } from "../../models/Admin";

declare module "express" {
  export interface Response {
    locals: {
      user?: DocumentType<User>;
      admin?: DocumentType<Admin>;
    };
  }
}
