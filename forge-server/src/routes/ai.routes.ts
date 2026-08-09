import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { testAI , explainAPI , generateTests} from "../controllers/ai.controller";

const router = express.Router();

router.get("/test", authenticate, testAI);
router.post("/explain", authenticate, explainAPI);
router.post("/generate-tests", authenticate, generateTests);

export default router;