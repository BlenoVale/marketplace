import { Types } from "mongoose";

export type AdType = {
    _id: Types.ObjectId;
    idUser: String;
    state: String;
    category: String;
    images: [Object];
    dateCreated: Date;
    tilte: String;
    price: Number;
    priceNegotiable: Boolean;
    description: String;
    views: number;
    status: String;
}