import { Request, Response } from "express";
import {
  getHistory,
  deleteHistory,
} from "../services/history.service";

export async function getAll(
  req: Request,
  res: Response
) {
  try {
    const history = await getHistory(
      (req as any).user._id.toString()
    );

    return res.status(200).json({
      success: true,
      data: history,
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

export async function remove(
  req: Request,
  res: Response
) {
  try {
    await deleteHistory(
      req.params.id as string,
      (req as any).user._id.toString()
    );

    return res.status(200).json({
      success: true,
      message: "History deleted successfully",
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