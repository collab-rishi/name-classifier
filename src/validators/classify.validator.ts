import { z } from "zod";


export const classifyQuerySchema = z.object({
  name: z
    .any() 
    .refine((val) => val !== undefined && val !== "", {
      message: "Name parameter is required", 
    })
    .refine((val) => typeof val === "string", {
      message: "Non-string name provided", 
    })
    .transform((val) => String(val).trim())
    .pipe(
      z.string().min(1, "Name parameter is required") 
    ),
});

export type ClassifyQuery = z.infer<typeof classifyQuerySchema>;