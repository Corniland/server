import { prop, getModelForClass, Ref, ReturnModelType } from "@typegoose/typegoose";
import { Project } from "./project";
import { hashPassword } from "../util/authUtil";

export class User {
  @prop()
  public email?: string;
  @prop()
  public username?: string;
  @prop()
  public password!: string;
  @prop()
  public password_salt!: string;
  @prop({ ref: "Project" })
  public liked_projects?: Ref<Project>[];
  @prop()
  public private_profile?: boolean;
  @prop()
  public banned?: boolean;

  async checkPassword(password: string): Promise<boolean> {
    const hashedPassword: string = await hashPassword(password, this.password_salt);
    return this.password === hashedPassword;
  }
}

export const UserModel = getModelForClass(User);
