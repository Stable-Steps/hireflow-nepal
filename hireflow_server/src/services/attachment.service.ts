import { supabase } from "../db/supabase.js";

import {
  Attachment,
  CreateAttachmentDto,
  UpdateAttachmentDto,
} from "../types/attachment.types.js";

export const getAttachments = async (
  companyId: string,
  applicationId: string,
): Promise<Attachment[]> => {
  const { data, error } = await supabase
    .from("attachments")
    .select("*")
    .eq("company_id", companyId)
    .eq("application_id", applicationId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const getAttachmentById = async (
  companyId: string,
  attachmentId: string,
): Promise<Attachment> => {
  const { data, error } = await supabase
    .from("attachments")
    .select("*")
    .eq("company_id", companyId)
    .eq("id", attachmentId)
    .is("deleted_at", null)
    .limit(1);

  if (error) throw new Error(error.message);

  const attachment = data?.[0];
  if (!attachment) throw new Error("Attachment not found");

  return attachment;
};

export const createAttachment = async (
  companyId: string,
  uploadedBy: string | null,
  payload: CreateAttachmentDto,
): Promise<Attachment> => {
  const { data, error } = await supabase
    .from("attachments")
    .insert({
      company_id: companyId,
      uploaded_by: uploadedBy,
      attachment_type: payload.attachment_type ?? "OTHER",
      ...payload,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const updateAttachment = async (
  companyId: string,
  attachmentId: string,
  payload: UpdateAttachmentDto,
): Promise<Attachment> => {
  const { data, error } = await supabase
    .from("attachments")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("company_id", companyId)
    .eq("id", attachmentId)
    .is("deleted_at", null)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteAttachment = async (
  companyId: string,
  attachmentId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("attachments")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("company_id", companyId)
    .eq("id", attachmentId)
    .is("deleted_at", null);

  if (error) throw new Error(error.message);
};
