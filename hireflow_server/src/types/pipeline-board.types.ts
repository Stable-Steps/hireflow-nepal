import { Candidate } from "./candidate.types.js";
import { ApplicationStatus } from "../constants/application.js";

export interface PipelineBoardApplication {
  id: string;
  candidate_id: string;
  job_id: string;
  pipeline_stage_id: string;
  status: ApplicationStatus;
  applied_at: string;
  candidate: Pick<
    Candidate,
    | "id"
    | "first_name"
    | "last_name"
    | "headline"
    | "current_company"
    | "current_position"
  >;
}

export interface PipelineBoardStage {
  id: string;
  name: string;
  color: string;
  display_order: number;
  applications: PipelineBoardApplication[];
}

export interface MoveApplicationDto {
  pipeline_stage_id: string;
}
