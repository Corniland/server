import { prop, getModelForClass } from "@typegoose/typegoose";

export class Admin {
  @prop()
  public login?: string;
  @prop()
  public password?: string;
  @prop()
  public password_salt?: string;
}

export const AdminModel = getModelForClass(Admin);
