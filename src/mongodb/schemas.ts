import { prop, getModelForClass, Ref /*, ReturnModelType*/ } from "@typegoose/typegoose";

export class User {
  @prop()
  public email?: string;
  @prop()
  public login?: string;
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

export class Project {
  @prop()
  public title?: string;
  @prop()
  public short_description?: string;
  @prop()
  public description?: string;
  @prop()
  public status?: string;
  @prop()
  public cover_picture_url?: string;
  @prop()
  public published?: boolean;
  @prop({ ref: "User" })
  public owner?: Ref<User>;
  @prop({ ref: "User" })
  public membmers?: Ref<User>[];
  @prop()
  public likes?: number;
}

export class Admin {
  @prop()
  public login?: string;
  @prop()
  public password?: string;
  @prop()
  public password_salt?: string;
}

export const UserModel = getModelForClass(User);
export const ProjectModel = getModelForClass(Project);
export const AdminModel = getModelForClass(Admin);
