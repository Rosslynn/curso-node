import { Router } from "express";
import { check, param } from "express-validator";

import { validateErrors, validateJWT, hasRole } from '../middlewares/index.mjs';
import CategoriesController from "../controllers/categories.mjs";
import { existingCategoryId, existingCategoryName } from "../helpers/db-validators.mjs";

const router = Router();
/**
 * {{url}}/api/categories
 */
//Obtener todas las categorías 
 router.get('/', CategoriesController.getCategories);

 // Obtener una categoría en particular - público ID
 router.get('/:id', [
    param('id','El id de la categoría es obligatorio').isMongoId().custom(existingCategoryId),
    validateErrors
 ], CategoriesController.getSingleCategory)

 // Crear una nueva categoría - privado (Cualquier persona con un token válido)
 router.post('/', [
     validateJWT,
     check('name','El nombre es obligatorio').notEmpty().custom(existingCategoryName),
     validateErrors
    ], CategoriesController.addCategory);

 //  Actualizar categoria por id - cualquiera con token
 router.put('/:id', [
    validateJWT,
    param('id', 'El id de la categoría es obligatorio').isMongoId().custom(existingCategoryId),
    check('name', 'El nombre a editar obligatorio.').notEmpty().custom(existingCategoryName),
    validateErrors
 ], CategoriesController.updateCategory);

 //  Delete o borrar una categoría - Administrador (estado activo a inactivo) ID
 router.delete('/:id', [
   validateJWT,
   hasRole('ADMIN_ROLE'),
   param('id', 'El id de la categoría a borrar es obligatorio').isMongoId().custom(existingCategoryId),
   validateErrors
], CategoriesController.deleteCategory);

export default router;
