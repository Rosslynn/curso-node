import { Category, Role, User, Product } from "../models/index.mjs";

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

const existingCategoryName = async (name = '', { req }) => {
    try {
        const { id } = req.params;
        const dbCategory = await Category.findById(id);

        if(!dbCategory.status) throw new Error(`La categoría con nombre ${name} ya existe y se encuentra inactiva.`);

        if (dbCategory.name.toUpperCase().trim() !== name.toUpperCase().trim()) {
            const dbCategoryByName = await Category.findOne({ name });
            if (dbCategoryByName) throw new Error(`La categoría con nombre ${name} ya existe.`);
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}


const existingCategoryId = async (id = '') => {
    try {
        const dbCategory = await Category.findById(id);
        if (!dbCategory) throw new Error(`La categoría con id ${ id } no existe`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const existingProductByName = async (name = '') => {
    try {
        const dbProduct = await Product.findOne({ name });
        if (dbProduct) throw new Error(`Ya existe un producto con el nombre ${name}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const editExistingProductName = async (name = '', { req }) => {
    try {
        const { id } = req.params;
        const dbProduct = await Product.findById(id);

        if(!dbProduct.status) throw new Error(`El producto con nombre ${name} ya existe y se encuentra inactivo.`);

        if (dbProduct.name.toUpperCase().trim() !== name.toUpperCase().trim()) {
            const dbProductByName = await Product.findOne({ name });
            if (dbProductByName) throw new Error(`El producto con nombre ${name} ya existe.`);
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}


const existingProductId = async (id = '') => {
    try {
        const dbProduct = await Product.findById(id);
        if (!dbProduct) throw new Error(`El producto con id ${ id } no existe.`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    validateRole,
    existingEmail,
    existingUser,
    existingCategoryName,
    existingCategoryId,
    editExistingProductName,
    existingProductId,
    existingProductByName
}