import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { testAI } from "../controllers/ai.controller";

const router = express.Router();

router.get("/test", authenticate, testAI);

export default router;