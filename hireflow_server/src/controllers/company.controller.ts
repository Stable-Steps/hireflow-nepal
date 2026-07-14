import { Request, Response } from "express";

import * as CompanyService from "../services/company.service.js";
import * as CompanyOnboardingService from "../services/company-onboarding.service.js";

import {
  Company,
  CompanyParams,
  UpdateCompanyDto,
} from "../types/company.types.js";

import { ApiResponse } from "../types/api.types.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createCompany = asyncHandler(
  async (req: Request, res: Response<ApiResponse<Company>>) => {
    const payload = {
      name: req.body.name,
      slug: req.body.slug,
      logo_url: req.body.logo_url ?? req.body.logoUrl ?? null,
    };

    const company = await CompanyOnboardingService.onboardCompany(
      req.user!.id,
      payload,
    );

    res.status(201).json({
      success: true,
      data: company,
    });
  },
);

export const getCurrentCompany = asyncHandler(
  async (req: Request, res: Response<ApiResponse<Company>>) => {
    const company = await CompanyService.getCompanyById(req.user!.company_id);
    res.json({
      success: true,
      data: company,
    });
  },
);

export const getCompanyById = asyncHandler(
  async (req: Request<CompanyParams>, res: Response<ApiResponse<Company>>) => {
    if (req.params.id !== req.user!.company_id) {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

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
    const body = req.body as {
      name?: string;
      slug?: string;
      logo_url?: string | null;
      logoUrl?: string | null;
    };

    const payload: UpdateCompanyDto = {
      name: body.name,
      slug: body.slug,
      logo_url: body.logo_url ?? body.logoUrl ?? undefined,
    };

    const company = await CompanyService.updateCompany(
      req.user!.company_id,
      payload,
    );

    res.json({
      success: true,
      data: company,
    });
  },
);
