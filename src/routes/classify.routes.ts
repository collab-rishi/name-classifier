import { Router } from "express";
import { classifyName } from "../controllers/classify.controller";
import { validate } from "../validators/validation.middleware";
import { classifyQuerySchema } from "../validators/classify.validator";

const router = Router();

router.get(
  "/classify", 
  validate(classifyQuerySchema), 
  classifyName
);

export default router;