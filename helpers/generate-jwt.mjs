import jwt from "jsonwebtoken";

const generateJWT = async (uid = '') => {
    try {
        return jwt.sign({ uid }, process.env.JWT_PRIVATE_KEY, {
            expiresIn: '24h'
        });
    } catch (error) {
        console.log('No se pudo generrar el JWT', error);
    }
}

export default generateJWT;