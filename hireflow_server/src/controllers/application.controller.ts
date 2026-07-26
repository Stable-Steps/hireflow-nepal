import { Request, Response } from "express";

import * as ApplicationService from "../services/application.service.js";
import * as ApplicationWorkflowService from "../services/application-workflow.service.js";

import * as PipelineBoardService from "../services/pipeline-board.service.js";
import { MoveApplicationDto } from "../types/pipeline-board.types.js";

import {
  Application,
  ApplicationParams,
  CreateApplicationDto,
  UpdateApplicationDto,
} from "../types/application.types.js";

import { ApiResponse } from "../types/api.types.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getApplications = asyncHandler(
  async (req: Request, res: Response<ApiResponse<Application[]>>) => {
    const applications = await ApplicationService.getAllApplications(
      req.user!.company_id,
    );

    res.json({
      success: true,
      data: applications,
    });
  },
);

export const getApplicationById = asyncHandler(
  async (
    req: Request<ApplicationParams>,
    res: Response<ApiResponse<Application>>,
  ) => {
    const application = await ApplicationService.getApplicationById(
      req.user!.company_id,
      req.params.id,
    );

    res.json({
      success: true,
      data: application,
    });
  },
);

export const createApplication = asyncHandler(
  async (
    req: Request<any, any, CreateApplicationDto>,
    res: Response<ApiResponse<Application>>,
  ) => {
    const application = await ApplicationWorkflowService.applyCandidate(
      req.user!.company_id,
      req.body,
    );

    res.status(201).json({
      success: true,
      data: application,
    });
  },
);

export const updateApplication = asyncHandler(
  async (
    req: Request<ApplicationParams, any, UpdateApplicationDto>,
    res: Response<ApiResponse<Application>>,
  ) => {
    const application = await ApplicationService.updateApplication(
      req.user!.company_id,
      req.params.id,
      req.body,
    );

    res.json({
      success: true,
      data: application,
    });
  },
);

export const deleteApplication = asyncHandler(
  async (req: Request<ApplicationParams>, res: Response<ApiResponse<null>>) => {
    await ApplicationService.deleteApplication(
      req.user!.company_id,
      req.params.id,
    );

    res.json({
      success: true,
      data: null,
    });
  },
);

export const moveApplication = asyncHandler(
  async (
    req: Request<ApplicationParams, any, MoveApplicationDto>,
    res: Response<ApiResponse<Application>>,
  ) => {
    const application = await PipelineBoardService.moveApplication(
      req.user!.company_id,
      req.params.id,
      req.body,
    );

    res.json({
      success: true,
      data: application,
    });
  },
);
