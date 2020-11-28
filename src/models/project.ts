import mongoose from "mongoose";
import { prop, getModelForClass, Ref, isRefType, isRefTypeArray } from "@typegoose/typegoose";
import _ from "lodash";

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
  public members!: mongoose.Types.Array<Ref<User>[]>;
  @prop()
  public likes!: number;

  isOwner(user: User): boolean {
    return isRefType(this.owner) && this.owner.equals(user._id);
  }

  isMember(user: User): boolean {
    return isRefTypeArray(this.members) && this.members.includes(user._id);
  }

  isPartOfProject(user: User): boolean {
    return this.isOwner(user) || this.isMember(user);
  }

  addMember(user: User): void {
    this.members.push(user);
  }

  removeMember(user: User): void {
    this.members.pull(user);
  }

  canSeeProject(user: User | undefined): boolean {
    return this.published || (user !== undefined && this.isPartOfProject(user));
  }
}

export const ProjectModel = getModelForClass(Project);
