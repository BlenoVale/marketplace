import mongoose, { Types } from "mongoose";
mongoose.Promise = global.Promise;

interface IAds {
    idUser: any;
    state: String;
    category: String;
    images: [Object];
    dateCreated: Date;
    title: String;
    price: Number;
    priceNegotiable: Boolean;
    description: String;
    views: Number;
    status: boolean;
}

const adsSchema = new mongoose.Schema<IAds>({
    idUser: { type: Types.ObjectId, required: true },
    state: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [Object], required: true },
    dateCreated: { type: Date, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    priceNegotiable: { type: Boolean, required: true },
    description: { type: String, required: true },
    views: { type: Number, required: true },
    status: { type: Boolean, required: true },
});

const Ad = mongoose.model<IAds>('Ads', adsSchema);

export default Ad;

/*
const modelSchema = new mongoose.Schema({
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    tilte: String,
    price: Number,
    priceHegotiable: Boolean,
    description: String,
    views: Number,
    status: String
});

const modelName = 'Ad';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}
*/