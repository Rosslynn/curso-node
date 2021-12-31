import { OAuth2Client } from 'google-auth-library';

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
    },
    googleSignIn: async (req, res) => {
        try {
            const { id_token } = req.body;
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const { name, picture, email } = ticket.getPayload();
            let user = await User.findOne({ email });
            console.log(user);

            if (!user) {
                console.log('no');
                // Se le puede colocar una contraseña plana ya que al iniciar sesión
                // Se utiliza bcrypt para comparar una contraseña plana contra una encriptada. Ya que ambas son planas da error y no se puede iniciar sesión
                user = new User({
                    name,
                    img: picture,
                    email,
                    password:':P',
                    google:true,
                    role:'USER_ROLE',
                });
                await user.save();
            }
            // Si el usuario en DB
            if(!user.status) {
                return res.status(401).json({
                    ok:false,
                    msg:'El usuario está inactivo, hable con el admin'
                })
            }
            //Generar JWT
            const token =  await generateJWT(user.id);

            return res.status(200).json({
                ok: true,
                token,
                user
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                ok:false,
                msg:'El token no he se ha podido verificar',
                error
            })
        }
    }
}

export default AuthController;