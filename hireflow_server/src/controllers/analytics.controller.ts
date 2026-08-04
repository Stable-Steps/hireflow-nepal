import { Request, Response } from "express";

import * as AnalyticsService from "../services/analytics.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../types/api.types.js";
import {
  AnalyticsActivityCount,
  AnalyticsOverview,
  AnalyticsPipelineStageCount,
} from "../types/analytics.types.js";

export const getOverview = asyncHandler(
  async (_req: Request, res: Response<ApiResponse<AnalyticsOverview>>) => {
    const overview = await AnalyticsService.getOverview(_req.user!.company_id);

    res.json({
      success: true,
      data: overview,
    });
  },
);

export const getPipelineAnalytics = asyncHandler(
  async (
    req: Request<{ jobId: string }>,
    res: Response<ApiResponse<AnalyticsPipelineStageCount[]>>,
  ) => {
    const data = await AnalyticsService.getPipelineAnalytics(
      req.user!.company_id,
      req.params.jobId,
    );

    res.json({
      success: true,
      data,
    });
  },
);

export const getApplicationActivitySummary = asyncHandler(
  async (
    req: Request<{ applicationId: string }>,
    res: Response<ApiResponse<AnalyticsActivityCount[]>>,
  ) => {
    const data = await AnalyticsService.getApplicationActivitySummary(
      req.user!.company_id,
      req.params.applicationId,
    );

    res.json({
      success: true,
      data,
    });
  },
);
