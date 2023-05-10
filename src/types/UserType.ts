import { Types } from "mongoose";

export type UserType = {
    _id: Types.ObjectId;
    name: String;
    email: String;
    state: String;
    passwordHash: String;
    token: String;
}