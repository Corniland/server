import { prop, getModelForClass /*, ReturnModelType*/ } from "@typegoose/typegoose";

export class User {
  @prop({ required: true })
  public id!: string;
  @prop()
  public email?: string;
  @prop()
  public login?: string;
  @prop()
  public password?: string;
  @prop()
  public passwordSalt?: string;
  @prop()
  public likedProjects?: [string];
  @prop()
  public privateProfile?: boolean;
  @prop()
  public banned?: boolean;
}

export class Project {
  @prop({ required: true })
  public id!: string;
  @prop()
  public title?: string;
  @prop()
  public shortDescription?: string;
  @prop()
  public description?: string;
  @prop()
  public status?: string;
  @prop()
  public coverPictureUrl?: string;
  @prop()
  public published?: boolean;
  @prop()
  public owner?: string;
  @prop()
  public mebmers?: [string];
  @prop()
  public likes?: number;
}

export class Admin {
  @prop({ required: true })
  public id!: string;
  @prop()
  public login?: string;
  @prop()
  public password?: string;
  @prop()
  public passwordSalt?: string;
}

export const UserModel = getModelForClass(User);
export const ProjectModel = getModelForClass(Project);
export const AdminModel = getModelForClass(Admin);
