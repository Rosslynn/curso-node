import { validationResult } from "express-validator"

const validateErrors = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: result.array()
        })
    }
    next();
}

export { validateErrors }