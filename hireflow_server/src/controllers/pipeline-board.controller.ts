import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../types/api.types.js";
import { PipelineBoardStage } from "../types/pipeline-board.types.js";
import * as PipelineBoardService from "../services/pipeline-board.service.js";

export const getBoard = asyncHandler(
  async (
    req: Request<{ jobId: string }>,
    res: Response<ApiResponse<PipelineBoardStage[]>>,
  ) => {
    const board = await PipelineBoardService.getBoard(
      req.user!.company_id,
      req.params.jobId,
    );

    res.json({
      success: true,
      data: board,
    });
  },
);
