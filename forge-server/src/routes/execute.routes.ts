import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { execute } from "../controllers/execute.controller";

const router = Router();

router.use(authenticate);

router.post(
  "/:id/execute",
  execute
);

export default router;