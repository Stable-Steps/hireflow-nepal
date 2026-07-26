import { Request, Response } from "express";

import * as ActivityService from "../services/activity.service.js";

import { Activity, CreateActivityDto } from "../types/activity.types.js";

import { ApiResponse } from "../types/api.types.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getActivities = asyncHandler(
  async (
    req: Request<{ applicationId: string }>,
    res: Response<ApiResponse<Activity[]>>,
  ) => {
    const activities = await ActivityService.getActivities(
      req.user!.company_id,
      req.params.applicationId,
    );

    res.json({
      success: true,
      data: activities,
    });
  },
);

export const createActivity = asyncHandler(
  async (
    req: Request<any, any, CreateActivityDto>,
    res: Response<ApiResponse<Activity>>,
  ) => {
    const activity = await ActivityService.createActivity(
      req.user!.company_id,
      req.body,
    );

    res.status(201).json({
      success: true,
      data: activity,
    });
  },
);
