import Role from "../models/role.mjs";
import User from "../models/user.mjs";

const validateRole = async (role = '') => {
    try {
        const dbRole = await Role.findOne({ role });
        if (!dbRole) throw new Error('El rol no es permitido');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const existingEmail = async (email = '') => {
    try {
        const dbUser = await User.findOne({ email });
        if (dbUser) throw new Error('El correo ya existe');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const existingUser = async (id = '') => {
    try {
        const dbUser = await User.findById(id);
        if (!dbUser) throw new Error(`El usuario con id ${ id } no existe`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    validateRole,
    existingEmail,
    existingUser
}