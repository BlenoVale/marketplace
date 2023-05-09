import mongoose from "mongoose";
mongoose.Promise = global.Promise;

interface ICategory {
    name: String;
    slug: String;
}

const categorySchema = new mongoose.Schema<ICategory>({
    name: { type: String, required: true },
    slug: { type: String, required: true },
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;

/*
const modelSchema = new mongoose.Schema({
    name: String,
    slug: String
});

const modelName = 'Category';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}
*/