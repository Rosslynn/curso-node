import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

const Role = model('Role', RoleSchema);

export default Role;