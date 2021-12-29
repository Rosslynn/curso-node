const validateAdminRole = async (req, res, next) => {
    try {
        if (!req.authenticatedUser) {
            return res.status(500).json({
                ok: false,
                msg: 'Se quiere autenticar el rol sin validar el token primero'
            });
        }

        const { role } = req.authenticatedUser;

        if( role !== 'ADMIN_ROLE'){
            return res.status(401).json({
                ok: false,
                msg:'Solo los usuarios con el rol de Administrador pueden realizar esta acción'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Contacta al admin pa que arregle su mierdero'
        })
    }
}

const hasRole = (...roles) => {
    return async (req, res, next) => {
        try {
            if (!req.authenticatedUser) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Se quiere autenticar el rol sin validar el token primero'
                });
            }

            if (!roles.includes(req.authenticatedUser.role)) {
                return res.status(401).json({
                    ok: false,
                    msg: `Solo los usuarios con el rol/roles de ${roles} pueden realizar esta acción`
                });
            }

            next();

        } catch (error) {
            console.log(error);
            return res.status(404).json({
                ok: false,
                msg: 'Error, puta, no tiene el puto rol'
            });
        }
    }
}

export  { validateAdminRole, hasRole };