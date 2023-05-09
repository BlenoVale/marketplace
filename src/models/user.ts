import mongoose from "mongoose";
mongoose.Promise = global.Promise;

interface IUser {
    name: String;
    email: String;
    state: String;
    passwordHash: String;
    token: String;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    state: { type: String, required: true },
    passwordHash: { type: String, required: true },
    token: { type: String, required: true }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

/*
const modelSchema = new mongoose.Schema({
    name: String,
    email: String,
    state: String,
    passwordHash: String,
    token: String
});

const modelName = 'User';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}
*/