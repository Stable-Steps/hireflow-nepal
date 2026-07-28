import { Request, Response } from "express";

import * as EmailService from "../services/email.service.js";
import * as ActivityService from "../services/activity.service.js";

import {
  Email,
  EmailParams,
  CreateEmailDto,
  UpdateEmailDto,
} from "../types/email.types.js";

import { ApiResponse } from "../types/api.types.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ActivityType } from "../constants/activity.js";

export const getEmails = asyncHandler(
  async (
    req: Request<{ applicationId: string }>,
    res: Response<ApiResponse<Email[]>>,
  ) => {
    const emails = await EmailService.getEmails(
      req.user!.company_id,
      req.params.applicationId,
    );

    res.json({
      success: true,
      data: emails,
    });
  },
);

export const getEmailById = asyncHandler(
  async (req: Request<EmailParams>, res: Response<ApiResponse<Email>>) => {
    const email = await EmailService.getEmailById(
      req.user!.company_id,
      req.params.id,
    );

    res.json({
      success: true,
      data: email,
    });
  },
);

export const createEmail = asyncHandler(
  async (
    req: Request<any, any, CreateEmailDto>,
    res: Response<ApiResponse<Email>>,
  ) => {
    const email = await EmailService.createEmail(
      req.user!.company_id,
      req.user!.id,
      req.body,
    );

    try {
      await ActivityService.createActivity(req.user!.company_id, {
        application_id: email.application_id,
        actor_id: req.user!.id,
        type: ActivityType.EMAIL_SENT,
        description: "Email sent",
        metadata: {
          email_id: email.id,
          subject: email.subject,
          to_address: email.to_address,
          direction: email.direction,
        },
      });
    } catch (error) {
      console.error("Failed to create activity:", error);
    }

    res.status(201).json({
      success: true,
      data: email,
    });
  },
);

export const updateEmail = asyncHandler(
  async (
    req: Request<EmailParams, any, UpdateEmailDto>,
    res: Response<ApiResponse<Email>>,
  ) => {
    const email = await EmailService.updateEmail(
      req.user!.company_id,
      req.params.id,
      req.body,
    );

    res.json({
      success: true,
      data: email,
    });
  },
);

export const deleteEmail = asyncHandler(
  async (req: Request<EmailParams>, res: Response<ApiResponse<null>>) => {
    await EmailService.deleteEmail(req.user!.company_id, req.params.id);

    res.json({
      success: true,
      data: null,
    });
  },
);
