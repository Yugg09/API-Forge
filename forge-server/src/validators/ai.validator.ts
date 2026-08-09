import { z } from "zod";

export const explainAPISchema = z.object({
  method: z
    .string()
    .min(1, "Method is required")
    .transform((val) => val.toUpperCase()),

  url: z.string().url("Invalid URL"),

  body: z.any().optional(),

  response: z.any(),
});

export const generateTestsSchema = z.object({
    method: z.string().min(1),
    url: z.string().url(),
    body: z.any().optional(),
  });
  
  export type GenerateTestsInput = z.infer<typeof generateTestsSchema>;

export type ExplainAPIInput = z.infer<typeof explainAPISchema>;