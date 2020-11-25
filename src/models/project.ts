import { prop, getModelForClass, Ref, isRefType, isRefTypeArray } from "@typegoose/typegoose";

import BaseModel from "./base";
import { User } from "./user";

export class Project extends BaseModel {
  @prop({ required: true })
  public title!: string;
  @prop({ required: true })
  public short_description!: string;
  @prop({ required: true })
  public description!: string;
  @prop({ required: true })
  public status!: string;
  @prop({ required: true })
  public cover_picture_url!: string;
  @prop({ required: true, default: false })
  public published!: boolean;
  @prop({ ref: "User" })
  public owner!: Ref<User>;
  @prop({ ref: "User" })
  public members!: Ref<User>[];
  @prop()
  public likes!: number;

  isPartOfProject(user: User): boolean {
    return (isRefType(this.owner) && this.owner.equals(user._id)) || (isRefTypeArray(this.members) && this.members.includes(user._id));
  }
}

export const ProjectModel = getModelForClass(Project);
