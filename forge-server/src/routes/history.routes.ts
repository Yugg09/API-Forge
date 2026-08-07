import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  getAll,
  remove,
} from "../controllers/history.controller";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  getAll
);

router.delete(
  "/:id",
  remove
);

export default router;