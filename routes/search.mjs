import { Router } from "express";
import { search } from "../controllers/search.mjs";

const router = Router();

router.get('/:collection/:query', search);

export default router;