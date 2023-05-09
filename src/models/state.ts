import mongoose from "mongoose";
mongoose.Promise = global.Promise;

interface IState {
    name: string;
}

const stateSchema = new mongoose.Schema<IState>({
    name: {type: String, required: true}
});

const State = mongoose.model<IState>('State', stateSchema);

export default State;

/*
const State = () => {

    const modelSchema = new mongoose.Schema({
        name: String
    });

    const modelName = 'State';

    if (mongoose.connection && mongoose.connection.models[modelName]) {
        module.exports = mongoose.connection.models[modelName];
    } else {
        module.exports = mongoose.model(modelName, modelSchema);
    }
}
*/