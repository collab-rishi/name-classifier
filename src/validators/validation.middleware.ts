import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import { ApiError } from "../utils/ApiError";

export const validate = (schema: ZodType<any, any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issue = error.issues[0].message;

        
        if (issue === "INVALID_TYPE") {
          return next(new ApiError(422, "Name must be a string"));
        }
        
     
        return next(new ApiError(400, "Name parameter is required"));
      }
      next(error);
    }
  };
};