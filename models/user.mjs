import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Los nombres son obligatorios'],
    },
    email:{
        type:String,
        required: [true, 'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        enum:{
            values:['ADMIN_ROLE','USER_ROLE'],
            message:'{VALUE} no está permitido.'
        },
        required: [true, 'El rol es obligatorio']
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean
    }
});

UserSchema.methods.toJSON = function() {
    //toObject genera la instancia de objeto con sus propiedades y valores
    const { password, __v, ...user } = this.toObject();
    user.uid = user._id;
    delete user._id;
    return user;
}

//Hash password
UserSchema.methods.hashPassword = async function (password) {
    try {
        this.password = await bcrypt.hash(password, 10);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'No se pudo encriptar la contraseña',
            error
        })
    }
}

//Compare password
UserSchema.methods.comparePasswords = async function (plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.password);
}


const User = model('User', UserSchema);

export default User;
