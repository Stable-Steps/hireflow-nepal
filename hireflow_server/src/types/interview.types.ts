import { InterviewStatus } from "../constants/interview.js";

export interface Interview {
  id: string;
  company_id: string;
  application_id: string;
  interviewer_id: string | null;
  title: string;
  starts_at: string;
  ends_at: string;
  meeting_url: string | null;
  location: string | null;
  notes: string | null;
  status: InterviewStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateInterviewDto {
  application_id: string;
  interviewer_id?: string | null;
  title?: string;
  starts_at: string;
  ends_at: string;
  meeting_url?: string | null;
  location?: string | null;
  notes?: string | null;
  status?: InterviewStatus;
}

export interface UpdateInterviewDto {
  interviewer_id?: string | null;
  title?: string;
  starts_at?: string;
  ends_at?: string;
  meeting_url?: string | null;
  location?: string | null;
  notes?: string | null;
  status?: InterviewStatus;
}

export interface InterviewParams {
  id: string;
}
