/* eslint-disable @typescript-eslint/naming-convention */

import { prop, getModelForClass } from "@typegoose/typegoose";

import { hashPassword } from "../util/authUtil";

import BaseModel from "./base";

export interface AdminJWTPayload {
  id: string;
  login: string;
}

export class Admin extends BaseModel {
  @prop()
  public login?: string;
  @prop()
  public password!: string;
  @prop()
  public password_salt!: string;

  async checkPassword(password: string): Promise<boolean> {
    const hashedPassword: string = await hashPassword(password, this.password_salt);
    return this.password === hashedPassword;
  }
}

export const AdminModel = getModelForClass(Admin);
