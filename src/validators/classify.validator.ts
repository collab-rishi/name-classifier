import { z } from "zod";


export const classifyQuerySchema = z.object({
  name: z
    .any()
    .refine((val) => val !== undefined && val !== "", {
      message: "REQUIRED", 
    })
    
    .refine((val) => !Array.isArray(val), {
      message: "INVALID_TYPE",
    })
    .refine((val) => typeof val === "string", {
      message: "INVALID_TYPE",
    })
    .transform((val) => String(val).trim())
    .pipe(
      z.string().min(1, "REQUIRED")
    ),
});