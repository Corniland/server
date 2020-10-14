import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

import { hashPassword } from "../util/authUtil";

import BaseModel from "./base";
import { Project } from "./project";

export interface UserJWTPayload {
  id: string;
  username: string;
}

export class User extends BaseModel {
  @prop()
  public email!: string;
  @prop()
  public username!: string;
  @prop()
  public password!: string;
  @prop()
  public password_salt!: string;
  @prop({ ref: "Project" })
  public liked_projects!: Ref<Project>[];
  @prop({ default: true })
  public private_profile!: boolean;
  @prop({ default: false })
  public banned!: boolean;

  async checkPassword(password: string): Promise<boolean> {
    const hashedPassword: string = await hashPassword(password, this.password_salt);
    return this.password === hashedPassword;
  }

  getJWTPayload(): UserJWTPayload {
    return {
      id: this._id.toHexString(),
      username: this.username,
    };
  }
}

export const UserModel = getModelForClass(User);
