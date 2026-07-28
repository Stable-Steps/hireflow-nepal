import { Request, Response } from "express";

import * as AttachmentService from "../services/attachment.service.js";
import * as ActivityService from "../services/activity.service.js";

import {
  Attachment,
  AttachmentParams,
  CreateAttachmentDto,
  UpdateAttachmentDto,
} from "../types/attachment.types.js";

import { ApiResponse } from "../types/api.types.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ActivityType } from "../constants/activity.js";

export const getAttachments = asyncHandler(
  async (
    req: Request<{ applicationId: string }>,
    res: Response<ApiResponse<Attachment[]>>,
  ) => {
    const attachments = await AttachmentService.getAttachments(
      req.user!.company_id,
      req.params.applicationId,
    );

    res.json({
      success: true,
      data: attachments,
    });
  },
);

export const getAttachmentById = asyncHandler(
  async (
    req: Request<AttachmentParams>,
    res: Response<ApiResponse<Attachment>>,
  ) => {
    const attachment = await AttachmentService.getAttachmentById(
      req.user!.company_id,
      req.params.id,
    );

    res.json({
      success: true,
      data: attachment,
    });
  },
);

export const createAttachment = asyncHandler(
  async (
    req: Request<any, any, CreateAttachmentDto>,
    res: Response<ApiResponse<Attachment>>,
  ) => {
    const attachment = await AttachmentService.createAttachment(
      req.user!.company_id,
      req.user!.id,
      req.body,
    );

    try {
      await ActivityService.createActivity(req.user!.company_id, {
        application_id: attachment.application_id,
        actor_id: req.user!.id,
        type: ActivityType.ATTACHMENT_ADDED,
        description: "Attachment added",
        metadata: {
          attachment_id: attachment.id,
          attachment_type: attachment.attachment_type,
          file_name: attachment.file_name,
        },
      });
    } catch (error) {
      console.error("Failed to create activity:", error);
    }

    res.status(201).json({
      success: true,
      data: attachment,
    });
  },
);

export const updateAttachment = asyncHandler(
  async (
    req: Request<AttachmentParams, any, UpdateAttachmentDto>,
    res: Response<ApiResponse<Attachment>>,
  ) => {
    const attachment = await AttachmentService.updateAttachment(
      req.user!.company_id,
      req.params.id,
      req.body,
    );

    res.json({
      success: true,
      data: attachment,
    });
  },
);

export const deleteAttachment = asyncHandler(
  async (req: Request<AttachmentParams>, res: Response<ApiResponse<null>>) => {
    await AttachmentService.deleteAttachment(
      req.user!.company_id,
      req.params.id,
    );

    res.json({
      success: true,
      data: null,
    });
  },
);
