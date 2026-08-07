import { Request, Response } from "express";
import { executeRequest } from "../services/execute.service";

export async function execute(
  req: Request,
  res: Response
) {
  try {
    const result = await executeRequest(
      req.params.id as string,
      (req as any).user._id.toString()
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
}