import { AttachmentType } from "../constants/attachment.js";

export interface Attachment {
  id: string;
  company_id: string;
  application_id: string;
  uploaded_by: string | null;

  file_name: string;
  file_url: string;
  mime_type: string | null;
  file_size: number | null;

  attachment_type: AttachmentType;
  notes: string | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateAttachmentDto {
  application_id: string;
  file_name: string;
  file_url: string;
  mime_type?: string | null;
  file_size?: number | null;
  attachment_type?: AttachmentType;
  notes?: string | null;
}

export interface UpdateAttachmentDto {
  file_name?: string;
  file_url?: string;
  mime_type?: string | null;
  file_size?: number | null;
  attachment_type?: AttachmentType;
  notes?: string | null;
}

export interface AttachmentParams {
  id: string;
}
