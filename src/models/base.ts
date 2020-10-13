import { modelOptions } from "@typegoose/typegoose";
import { Base } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export default class BaseModel extends Base {}
