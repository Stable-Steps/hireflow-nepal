import { Request, Response } from "express";

import * as CandidateService from "../services/candidate.service.js";

import {
  Candidate,
  CandidateParams,
  CreateCandidateDto,
  UpdateCandidateDto,
} from "../types/candidate.types.js";

import { ApiResponse } from "../types/api.types.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const getCandidates = asyncHandler(
  async (req: Request, res: Response<ApiResponse<Candidate[]>>) => {
    const candidates = await CandidateService.getAllCandidates(
      req.user!.company_id,
    );

    res.json({
      success: true,
      data: candidates,
    });
  },
);

export const getCandidateById = asyncHandler(
  async (
    req: Request<CandidateParams>,
    res: Response<ApiResponse<Candidate>>,
  ) => {
    const candidate = await CandidateService.getCandidateById(
      req.user!.company_id,
      req.params.id,
    );

    res.json({
      success: true,
      data: candidate,
    });
  },
);

export const createCandidate = asyncHandler(
  async (
    req: Request<any, any, CreateCandidateDto>,
    res: Response<ApiResponse<Candidate>>,
  ) => {
    const candidate = await CandidateService.createCandidate(
      req.user!.company_id,
      req.body,
    );

    res.status(201).json({
      success: true,
      data: candidate,
    });
  },
);

export const updateCandidate = asyncHandler(
  async (
    req: Request<CandidateParams, any, UpdateCandidateDto>,
    res: Response<ApiResponse<Candidate>>,
  ) => {
    const candidate = await CandidateService.updateCandidate(
      req.user!.company_id,
      req.params.id,
      req.body,
    );

    res.json({
      success: true,
      data: candidate,
    });
  },
);

export const deleteCandidate = asyncHandler(
  async (req: Request<CandidateParams>, res: Response<ApiResponse<null>>) => {
    await CandidateService.deleteCandidate(req.user!.company_id, req.params.id);

    res.json({
      success: true,
      data: null,
    });
  },
);
