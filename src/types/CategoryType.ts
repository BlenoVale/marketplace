import { Types } from "mongoose";

export type CategoryType = {
    _id: Types.ObjectId;
    name: String;
    slug: String;
}