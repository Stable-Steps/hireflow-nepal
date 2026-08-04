import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../types/api.types.js";
import {
  MatchCandidateJobDto,
  MatchCandidateJobResult,
} from "../types/ai.types.js";
import * as AIService from "../services/ai.service.js";

export const matchCandidateToJob = asyncHandler(
  async (
    req: Request<any, any, MatchCandidateJobDto>,
    res: Response<ApiResponse<MatchCandidateJobResult>>,
  ) => {
    const result = await AIService.matchCandidateToJob(
      req.user!.company_id,
      req.body,
    );

    res.json({
      success: true,
      data: result,
    });
  },
);
