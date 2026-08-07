import { Request, Response } from "express";
import {
  createRequest,
  getRequests,
  updateRequest,
  deleteRequest,
} from "../services/request.service";

export async function create(req: Request, res: Response) {
  try {
    const request = await createRequest({
      name: req.body.name,
      method: req.body.method,
      url: req.body.url,
      headers: req.body.headers || {},
      queryParams: req.body.queryParams || {},
      body: req.body.body || "",
      collectionId: req.body.collectionId,
      userId: (req as any).user._id.toString(),
    });

    return res.status(201).json({
      success: true,
      data: request,
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

export async function getAll(req: Request, res: Response) {
  try {
    const requests = await getRequests(
      req.params.collectionId as string,
      (req as any).user._id.toString()
    );

    return res.status(200).json({
      success: true,
      data: requests,
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

export async function update(req: Request, res: Response) {
  try {
    const request = await updateRequest(
      req.params.id as string,
      (req as any).user._id.toString(),
      req.body
    );

    return res.status(200).json({
      success: true,
      data: request,
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

export async function remove(req: Request, res: Response) {
  try {
    await deleteRequest(
      req.params.id as string,
      (req as any).user._id.toString()
    );

    return res.status(200).json({
      success: true,
      message: "Request deleted successfully",
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