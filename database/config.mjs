import mongoose from "mongoose"

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN)
        console.log('Conexión a la base de datos establecida...');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }
}

export default dbConnection
