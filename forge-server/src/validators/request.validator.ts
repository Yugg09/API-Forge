import { z } from "zod";

export const createRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),

  method: z.enum([
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ]),

  url: z.string().url(),

  headers: z.record(
    z.string(),
    z.string()
  ).default({}),
  
  queryParams: z.record(
    z.string(),
    z.string()
  ).default({}),

  body: z.string().default(""),

  collectionId: z.string(),
});

export const updateRequestSchema =
  createRequestSchema.partial();