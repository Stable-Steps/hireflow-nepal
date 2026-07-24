import { ApplicationStatus } from "../constants/application.js";

export interface Application {
  id: string;

  company_id: string;

  candidate_id: string;

  job_id: string;

  pipeline_stage_id: string | null;

  assigned_recruiter_id: string | null;

  status: ApplicationStatus;

  applied_at: string;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateApplicationDto {
  candidate_id: string;
  job_id: string;
  assigned_recruiter_id?: string | null;
}

export interface UpdateApplicationDto {
  pipeline_stage_id?: string;
  assigned_recruiter_id?: string | null;
  status?: ApplicationStatus;
}

export interface ApplicationParams {
  id: string;
}
