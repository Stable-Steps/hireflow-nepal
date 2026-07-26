import { ActivityType } from "../constants/activity.js";

export interface Activity {
  id: string;

  company_id: string;

  application_id: string;

  actor_id: string | null;

  type: ActivityType;

  description: string | null;

  metadata: Record<string, any> | null;

  created_at: string;
}

export interface CreateActivityDto {
  application_id: string;
  actor_id?: string | null;
  type: ActivityType;
  description?: string;
  metadata?: Record<string, any>;
}

export interface ActivityParams {
  id: string;
}
