import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Collection name must be at least 2 characters")
    .max(50, "Collection name cannot exceed 50 characters"),
});

export const updateCollectionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Collection name must be at least 2 characters")
    .max(50, "Collection name cannot exceed 50 characters"),
});

