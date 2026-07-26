import { Request, Response } from "express";

import * as InterviewService from "../services/interview.service.js";
import * as ActivityService from "../services/activity.service.js";

import {
  Interview,
  InterviewParams,
  CreateInterviewDto,
  UpdateInterviewDto,
} from "../types/interview.types.js";

import { ApiResponse } from "../types/api.types.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ActivityType } from "../constants/activity.js";

export const getInterviews = asyncHandler(
  async (
    req: Request<{ applicationId: string }>,
    res: Response<ApiResponse<Interview[]>>,
  ) => {
    const interviews = await InterviewService.getInterviews(
      req.user!.company_id,
      req.params.applicationId,
    );

    res.json({
      success: true,
      data: interviews,
    });
  },
);

export const getInterviewById = asyncHandler(
  async (
    req: Request<InterviewParams>,
    res: Response<ApiResponse<Interview>>,
  ) => {
    const interview = await InterviewService.getInterviewById(
      req.user!.company_id,
      req.params.id,
    );

    res.json({
      success: true,
      data: interview,
    });
  },
);

export const createInterview = asyncHandler(
  async (
    req: Request<any, any, CreateInterviewDto>,
    res: Response<ApiResponse<Interview>>,
  ) => {
    const interview = await InterviewService.createInterview(
      req.user!.company_id,
      req.body,
    );

    try {
      await ActivityService.createActivity(req.user!.company_id, {
        application_id: interview.application_id,
        actor_id: req.user!.id,
        type: ActivityType.INTERVIEW_SCHEDULED,
        description: "Interview scheduled",
        metadata: {
          interview_id: interview.id,
          interviewer_id: interview.interviewer_id,
          starts_at: interview.starts_at,
          ends_at: interview.ends_at,
        },
      });
    } catch (error) {
      console.error("Failed to create activity:", error);
    }

    res.status(201).json({
      success: true,
      data: interview,
    });
  },
);

export const updateInterview = asyncHandler(
  async (
    req: Request<InterviewParams, any, UpdateInterviewDto>,
    res: Response<ApiResponse<Interview>>,
  ) => {
    const interview = await InterviewService.updateInterview(
      req.user!.company_id,
      req.params.id,
      req.body,
    );

    res.json({
      success: true,
      data: interview,
    });
  },
);

export const deleteInterview = asyncHandler(
  async (req: Request<InterviewParams>, res: Response<ApiResponse<null>>) => {
    await InterviewService.deleteInterview(req.user!.company_id, req.params.id);

    res.json({
      success: true,
      data: null,
    });
  },
);
