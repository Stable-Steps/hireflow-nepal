import { Request, Response } from "express";

import * as PipelineStageService from "../services/pipeline-stage.service.js";

import {
  PipelineStage,
  PipelineStageParams,
  CreatePipelineStageDto,
  UpdatePipelineStageDto,
} from "../types/pipeline-stage.types.js";

import { ApiResponse } from "../types/api.types.js";

export const list = async (
  req: Request<{ templateId: string }>,
  res: Response<ApiResponse<PipelineStage[]>>,
) => {
  const companyId = req.user.company_id;

  const stages = await PipelineStageService.list(
    companyId,
    req.params.templateId,
  );

  res.json({
    success: true,
    data: stages,
  });
};

export const getById = async (
  req: Request<PipelineStageParams>,
  res: Response<ApiResponse<PipelineStage>>,
) => {
  const companyId = req.user.company_id;

  const stage = await PipelineStageService.getById(
    companyId,
    req.params.templateId,
    req.params.stageId,
  );

  res.json({
    success: true,
    data: stage,
  });
};

export const create = async (
  req: Request<{ templateId: string }>,
  res: Response<ApiResponse<PipelineStage>>,
) => {
  const companyId = req.user.company_id;

  const payload: CreatePipelineStageDto = req.body;

  const stage = await PipelineStageService.create(
    companyId,
    req.params.templateId,
    payload,
  );

  res.status(201).json({
    success: true,
    data: stage,
  });
};

export const update = async (
  req: Request<PipelineStageParams>,
  res: Response<ApiResponse<PipelineStage>>,
) => {
  const companyId = req.user.company_id;

  const payload: UpdatePipelineStageDto = req.body;

  const stage = await PipelineStageService.update(
    companyId,
    req.params.templateId,
    req.params.stageId,
    payload,
  );

  res.json({
    success: true,
    data: stage,
  });
};

export const remove = async (
  req: Request<PipelineStageParams>,
  res: Response<ApiResponse<null>>,
) => {
  const companyId = req.user.company_id;

  await PipelineStageService.remove(
    companyId,
    req.params.templateId,
    req.params.stageId,
  );

  res.json({
    success: true,
    data: null,
  });
};
