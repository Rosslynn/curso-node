import generateJWT from "../helpers/generate-jwt.mjs";
import User from "../models/user.mjs";

const AuthController = {
    login: async (req, res) => {
       try {
           const { email, password } = req.body;
           const user = await User.findOne({ email });
           // Verificar si existe el correo
           if (!user) {
               return res.status(400).json({
                   ok: false,
                   msg:'Credenciales incorrectas'
               });
           }
           //Verificar si el usuario está activo
           if (!user.status) {
               return res.status(400).json({
                   ok: false,
                   msg: 'El usuario no se encuentra activo'
               });
           }
          // Comparar contraseñas
          const compare = await user.comparePasswords(password);

          if (!compare) {
              return res.status(400).json({
                  ok: false,
                  msg: 'Credenciales incorrectas'
              })
          }
          //Generar JWT
          const token =  await generateJWT(user.id);

          return res.status(200).json({
              ok:true,
              token,
              user
          });

       } catch (error) {
           console.log(error);
           return res.status(500).json({
               ok:false,
               msg:'Hable con el admin pa que arregle su verguero',
               error
           })
       }
    }
}

export default AuthController;