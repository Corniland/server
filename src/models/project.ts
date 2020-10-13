import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

import BaseModel from "./base";
import { User } from "./user";

export class Project extends BaseModel {
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
  public members?: Ref<User>[];
  @prop()
  public likes?: number;
}

export const ProjectModel = getModelForClass(Project);
