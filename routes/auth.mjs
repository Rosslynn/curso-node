import { Router } from "express";
import { check } from "express-validator";

import authController from "../controllers/auth.mjs";
import { validateErrors } from '../middlewares/validate-errors.mjs';

const router = Router();

router.post('/login', [
    check('email','El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateErrors
], authController.login);

router.post('/google', [
    check('id_token','id_token de google es necesario').notEmpty(),
    validateErrors
], authController.googleSignIn);

export default router;