import { Request, Response } from "express";

import * as CompanyService from "../services/company.service.js";

import {
  Company,
  CompanyParams,
  UpdateCompanyDto,
} from "../types/company.types.js";

import { ApiResponse } from "../types/api.types.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createCompany = asyncHandler(
  async (req: Request, res: Response<ApiResponse<Company>>) => {
    const company = await CompanyService.createCompany(req.body);
    res.status(201).json({
      success: true,
      data: company,
    });
  },
);

export const getCurrentCompany = asyncHandler(
  async (req: Request, res: Response<ApiResponse<Company>>) => {
    const company = await CompanyService.getCompanyById(req.user!.company_id);
    console.log("data", req.user);
    res.json({
      success: true,
      data: company,
    });
  },
);

export const getCompanyById = asyncHandler(
  async (req: Request<CompanyParams>, res: Response<ApiResponse<Company>>) => {
    const company = await CompanyService.getCompanyById(req.params.id);

    res.json({
      success: true,
      data: company,
    });
  },
);

export const updateCompany = asyncHandler(
  async (
    req: Request<any, any, UpdateCompanyDto>,
    res: Response<ApiResponse<Company>>,
  ) => {
    const company = await CompanyService.updateCompany(
      req.user!.company_id,
      req.body,
    );

    res.json({
      success: true,
      data: company,
    });
  },
);
