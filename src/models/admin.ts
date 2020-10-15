import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import bcrypt from "bcrypt";

import BaseModel from "./base";

export interface AdminJWTPayload {
  id: string;
  login: string;
}

@pre<Admin>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password_salt = await Admin.generateSalt(12);
  this.password = await this.hashPassword(this.password);
  next();
})
export class Admin extends BaseModel {
  @prop()
  public login!: string;
  @prop()
  public password!: string;
  @prop()
  public password_salt!: string;

  static async generateSalt(length: number): Promise<string> {
    return await bcrypt.genSalt(length);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.password_salt);
  }

  async checkPassword(password: string): Promise<boolean> {
    return this.password === (await this.hashPassword(password));
  }

  getJWTPayload(): AdminJWTPayload {
    return {
      id: this._id.toHexString(),
      login: this.login,
    };
  }
}

export const AdminModel = getModelForClass(Admin);

async function GenerateFirstAdmin(): Promise<void> {
  if ((await AdminModel.collection.countDocuments()) === 0) {
    const admin = new AdminModel();
    admin.login = process.env.DEFAULT_ADMIN_LOGIN;
    admin.password = process.env.DEFAULT_ADMIN_PASSWORD;
    admin.save();
  }
}
GenerateFirstAdmin();
