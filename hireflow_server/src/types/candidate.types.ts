import { CandidateSource } from "../constants/candidate.js";

export interface Candidate {
  id: string;

  company_id: string;

  first_name: string;
  last_name: string;

  email: string;
  phone: string | null;

  headline: string | null;

  current_company: string | null;
  current_position: string | null;

  linkedin_url: string | null;
  portfolio_url: string | null;

  location: string | null;

  summary: string | null;

  source: CandidateSource;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateCandidateDto {
  first_name: string;
  last_name: string;

  email: string;

  phone?: string;

  headline?: string;

  current_company?: string;
  current_position?: string;

  linkedin_url?: string;
  portfolio_url?: string;

  location?: string;

  summary?: string;

  source?: CandidateSource;
}

export interface UpdateCandidateDto {
  first_name?: string;
  last_name?: string;

  email?: string;

  phone?: string | null;

  headline?: string | null;

  current_company?: string | null;
  current_position?: string | null;

  linkedin_url?: string | null;
  portfolio_url?: string | null;

  location?: string | null;

  summary?: string | null;

  source?: CandidateSource;
}

export interface CandidateParams {
  id: string;
}
