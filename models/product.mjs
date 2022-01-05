import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        uppercase: true
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'La categoría es obligatoria']
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario creador es obligatorio']
    }
});

ProductSchema.methods.toJSON = function () {
    const {__v, status, ...data } = this.toObject();
    return data;
}

const Product = model('Product', ProductSchema);

export default Product;