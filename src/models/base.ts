import { modelOptions } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export default class BaseModel {}
