import { Request, Response } from "express";

import * as PipelineTemplateService from "../services/pipeline-template.service.js";

import {
  PipelineTemplate,
  PipelineTemplateParams,
  CreatePipelineTemplateDto,
  UpdatePipelineTemplateDto,
} from "../types/pipeline-template.types.js";

import { ApiResponse } from "../types/api.types.js";

export const list = async (
  req: Request,
  res: Response<ApiResponse<PipelineTemplate[]>>,
) => {
  const companyId = req.user.company_id;

  const templates = await PipelineTemplateService.list(companyId);

  res.json({
    success: true,
    data: templates,
  });
};

export const getById = async (
  req: Request<PipelineTemplateParams>,
  res: Response<ApiResponse<PipelineTemplate>>,
) => {
  const companyId = req.user.company_id;

  const template = await PipelineTemplateService.getById(
    req.params.templateId,
    companyId,
  );

  res.json({
    success: true,
    data: template,
  });
};

export const create = async (
  req: Request,
  res: Response<ApiResponse<PipelineTemplate>>,
) => {
  const companyId = req.user.company_id;

  const payload: CreatePipelineTemplateDto = req.body;

  const template = await PipelineTemplateService.create(companyId, payload);

  res.status(201).json({
    success: true,
    data: template,
  });
};

export const update = async (
  req: Request<PipelineTemplateParams>,
  res: Response<ApiResponse<PipelineTemplate>>,
) => {
  const companyId = req.user.company_id;

  const payload: UpdatePipelineTemplateDto = req.body;

  const template = await PipelineTemplateService.update(
    req.params.templateId,
    companyId,
    payload,
  );

  res.json({
    success: true,
    data: template,
  });
};

export const remove = async (
  req: Request<PipelineTemplateParams>,
  res: Response<ApiResponse<null>>,
) => {
  const companyId = req.user.company_id;

  await PipelineTemplateService.remove(req.params.templateId, companyId);

  res.json({
    success: true,
    data: null,
  });
};
