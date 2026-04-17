import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { GenderService } from "../services/gender.service";


export const classifyName = asyncHandler(async (req: Request, res: Response) => {
 
  const name = req.query.name as string;

  const result = await GenderService.classifyName(name);

  
   res.status(200).json({
    status: "success",
    data: result
  });

  return;
});