import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";

import {
  create,
  getAll,
  update,
  remove,
} from "../controllers/request.controller";

import {
  createRequestSchema,
  updateRequestSchema,
} from "../validators/request.validator";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createRequestSchema),
  create
);

router.get(
  "/:collectionId",
  getAll
);

router.patch(
  "/:id",
  validate(updateRequestSchema),
  update
);

router.delete(
  "/:id",
  remove
);

export default router;