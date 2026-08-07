import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";

import {
  create,
  getAll,
  update,
  remove,
} from "../controllers/collection.controller";

import {
  createCollectionSchema,
  updateCollectionSchema,
} from "../validators/collection.validator";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createCollectionSchema),
  create
);

router.get(
  "/",
  getAll
);

router.patch(
  "/:id",
  validate(updateCollectionSchema),
  update
);

router.delete(
  "/:id",
  remove
);

export default router;