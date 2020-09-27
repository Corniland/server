import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true },
  email: String,
  login: String,
  password: String,
  passwordSalt: String,
  likedProjects: [String],
  privateProfile: Boolean,
  banned: Boolean,
});

const ProjectSchema = new Schema({
  id: { type: String, required: true },
  title: String,
  shortDescription: String,
  description: String,
  status: String,
  coverPictureUrl: String,
  published: Boolean,
  owner: String,
  mebmers: [String],
  likes: Number,
});

const AdminSchema = new Schema({
  id: { type: String, required: true },
  login: String,
  password: String,
  passwordSalt: String,
});

export const UserModel = mongoose.model("User", UserSchema);
export const ProjectModel = mongoose.model("Project", ProjectSchema);
export const AdminModel = mongoose.model("Admin", AdminSchema);
