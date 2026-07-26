import { Request, Response } from "express";

import * as NoteService from "../services/note.service.js";
import * as ActivityService from "../services/activity.service.js";

import {
  Note,
  CreateNoteDto,
  UpdateNoteDto,
  NoteParams,
} from "../types/note.types.js";

import { ApiResponse } from "../types/api.types.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ActivityType } from "../constants/activity.js";

export const getNotes = asyncHandler(
  async (
    req: Request<{ applicationId: string }>,
    res: Response<ApiResponse<Note[]>>,
  ) => {
    const notes = await NoteService.getNotes(
      req.user!.company_id,
      req.params.applicationId,
    );

    res.json({
      success: true,
      data: notes,
    });
  },
);

export const createNote = asyncHandler(
  async (
    req: Request<any, any, CreateNoteDto>,
    res: Response<ApiResponse<Note>>,
  ) => {
    const note = await NoteService.createNote(req.user!.company_id, req.body);

    await ActivityService.createActivity(req.user!.company_id, {
      application_id: note.application_id,
      actor_id: req.user!.id,
      type: ActivityType.NOTE_ADDED,
      description: "Recruiter added a note",
      metadata: {
        note_id: note.id,
      },
    });

    res.status(201).json({
      success: true,
      data: note,
    });
  },
);

export const updateNote = asyncHandler(
  async (
    req: Request<NoteParams, any, UpdateNoteDto>,
    res: Response<ApiResponse<Note>>,
  ) => {
    const note = await NoteService.updateNote(
      req.user!.company_id,
      req.params.id,
      req.body,
    );

    res.json({
      success: true,
      data: note,
    });
  },
);

export const deleteNote = asyncHandler(
  async (req: Request<NoteParams>, res: Response<ApiResponse<null>>) => {
    await NoteService.deleteNote(req.user!.company_id, req.params.id);

    res.json({
      success: true,
      data: null,
    });
  },
);
