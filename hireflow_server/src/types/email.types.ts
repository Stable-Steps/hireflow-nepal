import { EmailDirection, EmailStatus } from "../constants/email.js";

export interface Email {
  id: string;
  company_id: string;
  application_id: string;
  sent_by: string | null;

  direction: EmailDirection;
  status: EmailStatus;

  from_address: string | null;
  to_address: string;

  cc: string | null;
  bcc: string | null;

  subject: string;
  body: string;

  provider: string | null;
  provider_message_id: string | null;

  sent_at: string | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateEmailDto {
  application_id: string;
  direction?: EmailDirection;
  status?: EmailStatus;
  from_address?: string | null;
  to_address: string;
  cc?: string | null;
  bcc?: string | null;
  subject: string;
  body: string;
  provider?: string | null;
  provider_message_id?: string | null;
  sent_at?: string | null;
}

export interface UpdateEmailDto {
  direction?: EmailDirection;
  status?: EmailStatus;
  from_address?: string | null;
  to_address?: string;
  cc?: string | null;
  bcc?: string | null;
  subject?: string;
  body?: string;
  provider?: string | null;
  provider_message_id?: string | null;
  sent_at?: string | null;
}

export interface EmailParams {
  id: string;
}
