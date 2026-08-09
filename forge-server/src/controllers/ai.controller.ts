import { Request, Response } from "express";
import { testGemini } from "../services/ai.service";

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