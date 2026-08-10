import { Request, Response } from "express";

import {
  testGemini,
  explainAPI as explainAPIService,
  generateTestCases,
  analyzeResponse,
} from "../services/ai.service";

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
    const explanation = await explainAPIService(req.body);

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
    const tests = await generateTestCases(req.body);

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

export async function analyzeAPIResponse(
  req: Request,
  res: Response
) {
  try {
    const analysis = await analyzeResponse(req.body);

    return res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}