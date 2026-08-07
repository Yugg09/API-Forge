import { Request, Response } from "express";
import {
  createCollection,
  getCollections,
  renameCollection,
  deleteCollection,
} from "../services/collection.service";

export async function create(req: Request, res: Response) {
  try {
    const collection = await createCollection({
      name: req.body.name,
      userId: (req as any).user._id.toString(),
    });

    return res.status(201).json({
      success: true,
      data: collection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const collections = await getCollections(
      (req as any).user._id.toString()
    );

    return res.status(200).json({
      success: true,
      data: collections,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const collection = await renameCollection(
      req.params.id as string,
      (req as any).user._id.toString(),
      req.body.name
    );

    return res.status(200).json({
      success: true,
      data: collection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deleteCollection(
      req.params.id as string,
      (req as any).user._id.toString()
    );

    return res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}