import { Router } from "express";
import { check } from "express-validator";

import userController from "../controllers/user.mjs";
import { existingEmail, existingUser, validateRole } from "../helpers/db-validators.mjs";
import { validateErrors } from "../middlewares/validate-errors.mjs";

const router = Router();

// Es un middleware que se ejecuta a todas las rutas /api, antes de pasar a
// la que se llamó originalmente, se debe pasar next, por lo mismo, es un mddlieware
router.all('/',(req,res, next) => {
    console.log('Has llamado api XD');
    next();
});

router.get('/', [
    check('limit').optional(),
    validateErrors
], userController.getUsuarios);

router.put('/:id', [
    check('id','No es un id valido').isMongoId().custom(existingUser),
    check('role', 'El rol indicado no es válido').custom(validateRole),
    validateErrors
], userController.putUsuarios);

router.post('/', [
    check('name', 'Los nombres son obligatorios').notEmpty(),
    check('email', 'El correo es obligatorio').isEmail().custom(existingEmail),
    check('password', 'La contraseña es obligatoria, mínimo de caracteres es 6.').isLength({
        min: 6
    }),
    /*   check('role','El rol indicado no es válido').isIn(['ADMIN_ROLE','USER_ROLE']), */
    check('role', 'El rol indicado no es válido').custom(validateRole),
    validateErrors
], userController.postUsuarios);

router.delete('/:id', [
    check('id','No es un id valido').isMongoId().custom(existingUser),
    validateErrors
], userController.deleteUsuarios);

router.use('*',(req,res)=>{
    console.log('XDdddd');
})

export default router;