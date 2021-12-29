import jwt from "jsonwebtoken";
import User from "../models/user.mjs";

const validateJWT = async (req, res, next) => {
    try {
        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'No se ha encontrado el token en la petición'
            })
        }

        const { uid } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const user = await User.findById(uid);
        //Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no existe en la base de datos'
            })
        }
        // Verificar si el usuario no está inactivo
        if (!user.status) {
            return res.status(401).json({
                ok: false,
                msg: 'El estado del usuario es inactivo'
            })
        }

        req.authenticatedUser = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'El token no es valido'
        })
    }
}

export default validateJWT