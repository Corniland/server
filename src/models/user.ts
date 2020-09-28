import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

import { Project } from "./project";

export class User {
  @prop()
  public email?: string;
  @prop()
  public username?: string;
  @prop()
  public password?: string;
  @prop()
  public password_salt?: string;
  @prop({ ref: "Project" })
  public liked_projects?: Ref<Project>[];
  @prop()
  public private_profile?: boolean;
  @prop()
  public banned?: boolean;
}

export const UserModel = getModelForClass(User);
