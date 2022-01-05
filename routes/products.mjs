import { Router } from "express";
import { body, param } from "express-validator";
import ProductController from "../controllers/product.mjs";
import { existingCategoryId, existingProductByName, existingProductId, existingUser } from "../helpers/db-validators.mjs";
import { validateErrors, validateJWT } from "../middlewares/index.mjs";

const router = Router();

//Obtener productos
router.get('/', ProductController.getProducts);

// Obtener producto por id
router.get('/:id', [
    param('id','Mandar el id como parámetro es obligatorio').isMongoId().custom(existingProductId),
    validateErrors
], ProductController.getSingleProduct);

// Crear un nuevo producto con token
router.post('/', [
    validateJWT,
    body('name', 'El nombre del producto es obligatorio').notEmpty().custom(existingProductByName),
    body('category', 'Debes enviar el id de la categoría  a la que pertenecerá el producto y debe ser un id valido de Mongo.').isMongoId().custom(existingCategoryId),
    body('user', 'Debes enviar el id del usuario creador del producto y debe ser un id valido de Mongo.').isMongoId().custom(existingUser),
    validateErrors
], ProductController.addProduct);

// Actualizar producto con token

// Borrar producto admin, estado

export default router;