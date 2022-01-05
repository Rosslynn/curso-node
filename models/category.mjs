import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique:true,
        uppercase:true
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario creador es obligatorio']
    }
});

CategorySchema.methods.toJSON = function () {
    const {__v, ...category} = this.toObject();
    delete category.user.__v;
    delete category.user.password;
    return category;
}

const Category = model('Category', CategorySchema);
export default Category;