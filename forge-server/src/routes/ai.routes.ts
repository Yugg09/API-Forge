import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { testAI , explainAPI , generateTests , analyzeAPIResponse } from "../controllers/ai.controller";

const router = express.Router();

router.get("/test", authenticate, testAI);
router.post("/explain", authenticate, explainAPI);
router.post("/generate-tests", authenticate, generateTests);
router.post("/analyze-response", authenticate, analyzeAPIResponse);

export default router;