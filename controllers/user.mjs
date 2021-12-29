import User from "../models/user.mjs";

const userController = {
    getUsuarios: async (req, res) => {
        try {
            const { from = 0, limit = 5 } = req.query;
            const query = { status: true }
            const [ total, users ] = await Promise.all([
                User.countDocuments(query),
                User.find(query)
                .skip(+from)
                .limit(+limit),
            ]);
            /* users = users.splice(from || 0, limit || users.length); */
            return res.status(200).json({
                ok: true,
                total,
                users,
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg:'Contacta al admin pa que arregle su verguero',
                error
            })
        }
    },
    putUsuarios: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, password, google, email, ...rest } = req.body;
            const user = await User.findByIdAndUpdate(id, rest, { new : true });
            //TODO: Validar id con bd
            if ( password ) {
                await user.hashPassword(password);
                user.save();
            }

            return res.status(200).json({
                ok: true,
                user
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg:'Contacta al admin pa que arregle su verguero',
                error
            })
        }
    },
    postUsuarios: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;
            // Crear nuevo usuario
            const user = new User({ name, email, password, role });
            // Encriptar contraseña
            await user.hashPassword(password);
            await user.save();
            
            return res.status(201).json({
                ok:true,
                user
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Contacta con el admin para que arregle su mierdero',
                error
            });
        }
    },
    deleteUsuarios: async (req, res) => {
        try {
            const { id } = req.params;
            const { authenticatedUser } = req;  
            const user = await User.findByIdAndUpdate(id, { status: false });

            return res.status(200).json({
                ok:true,
                user,
                authenticatedUser
            })
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Contacta con el admin para que arregle su mierdero',
                error
            }); 
        }
    },
}

export default userController;