import { prop, getModelForClass, Ref, isRefType } from "@typegoose/typegoose";
import _ from "lodash";

import { hashPassword } from "../util/authUtil";

import BaseModel from "./base";
import { Project } from "./project";

export interface UserJWTPayload {
  id: string;
  email: string;
  username: string;
}

export class User extends BaseModel {
  @prop({ required: true })
  public email!: string;
  @prop({ required: true })
  public username!: string;
  @prop({ required: true })
  public password!: string;
  @prop({ required: true })
  public password_salt!: string;
  @prop({ ref: Project })
  public liked_projects!: Ref<Project>[];
  @prop({ required: true, default: true })
  public private_profile!: boolean;
  @prop({ required: true, default: false })
  public banned!: boolean;

  async checkPassword(password: string): Promise<boolean> {
    const hashedPassword: string = await hashPassword(password, this.password_salt);
    return this.password === hashedPassword;
  }

  getJWTPayload(): UserJWTPayload {
    return {
      id: this._id.toHexString(),
      email: this.email,
      username: this.username,
    };
  }

  likeProject(project: Project): void {
    this.liked_projects.push(project);
    project.likes++;
  }

  unlikeProject(project: Project): void {
    this.liked_projects = _.remove(this.liked_projects, (p) => isRefType(p) && p.equals(project._id));
    project.likes--;
  }
}

export const UserModel = getModelForClass(User);
