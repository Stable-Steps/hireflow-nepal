import { supabase } from "../db/supabase.js";

import { Email, CreateEmailDto, UpdateEmailDto } from "../types/email.types.js";

export const getEmails = async (
  companyId: string,
  applicationId: string,
): Promise<Email[]> => {
  const { data, error } = await supabase
    .from("emails")
    .select("*")
    .eq("company_id", companyId)
    .eq("application_id", applicationId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getEmailById = async (
  companyId: string,
  emailId: string,
): Promise<Email> => {
  const { data, error } = await supabase
    .from("emails")
    .select("*")
    .eq("company_id", companyId)
    .eq("id", emailId)
    .is("deleted_at", null)
    .limit(1);

  if (error) throw new Error(error.message);

  const email = data?.[0];
  if (!email) throw new Error("Email not found");

  return email;
};

export const createEmail = async (
  companyId: string,
  sentBy: string | null,
  payload: CreateEmailDto,
): Promise<Email> => {
  const { data, error } = await supabase
    .from("emails")
    .insert({
      company_id: companyId,
      sent_by: sentBy,
      direction: payload.direction ?? "OUTBOUND",
      status: payload.status ?? "SENT",
      ...payload,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateEmail = async (
  companyId: string,
  emailId: string,
  payload: UpdateEmailDto,
): Promise<Email> => {
  const { data, error } = await supabase
    .from("emails")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("company_id", companyId)
    .eq("id", emailId)
    .is("deleted_at", null)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteEmail = async (
  companyId: string,
  emailId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("emails")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("company_id", companyId)
    .eq("id", emailId)
    .is("deleted_at", null);

  if (error) throw new Error(error.message);
};
