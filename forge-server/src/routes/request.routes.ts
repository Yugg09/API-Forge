import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";

import {
  create,
  getAll,
  update,
  remove,
} from "../controllers/request.controller";

const router = Router();

router.use(authenticate);

router.post("/", create);

router.get("/", getAll);

router.patch("/:id", update);

router.delete("/:id", remove);



export default router;