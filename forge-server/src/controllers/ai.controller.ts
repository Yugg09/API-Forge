import { Request, Response } from "express";

import {
  testGemini,
  explainAPI as explainAPIService,
  generateTestCases,
} from "../services/ai.service";

import {
  explainAPISchema,
  generateTestsSchema,
} from "../validators/ai.validator";

export async function testAI(req: Request, res: Response) {
  try {
    const result = await testGemini();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function explainAPI(req: Request, res: Response) {
  try {
    const validatedData = explainAPISchema.parse(req.body);

    const explanation = await explainAPIService(validatedData);

    return res.status(200).json({
      success: true,
      explanation,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function generateTests(req: Request, res: Response) {
  try {
    const validatedData = generateTestsSchema.parse(req.body);

    const tests = await generateTestCases(validatedData);

    return res.status(200).json({
      success: true,
      tests,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}