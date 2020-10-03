import { prop, getModelForClass } from "@typegoose/typegoose";
import { hashPassword } from "../util/authUtil";

export class Admin {
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
