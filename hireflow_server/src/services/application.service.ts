import { supabase } from "../db/supabase.js";

import {
  Application,
  CreateApplicationDto,
  UpdateApplicationDto,
} from "../types/application.types.js";

export const getAllApplications = async (
  companyId: string,
): Promise<Application[]> => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("company_id", companyId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const getApplicationById = async (
  companyId: string,
  applicationId: string,
): Promise<Application> => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("company_id", companyId)
    .eq("id", applicationId)
    .is("deleted_at", null)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const createApplication = async (
  companyId: string,
  payload: CreateApplicationDto & {
    pipeline_stage_id: string;
    status?: string;
  },
): Promise<Application> => {
  const { data, error } = await supabase
    .from("applications")
    .insert({
      company_id: companyId,
      ...payload,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const updateApplication = async (
  companyId: string,
  applicationId: string,
  payload: UpdateApplicationDto,
): Promise<Application> => {
  const { data, error } = await supabase
    .from("applications")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("company_id", companyId)
    .eq("id", applicationId)
    .is("deleted_at", null)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteApplication = async (
  companyId: string,
  applicationId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("applications")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("company_id", companyId)
    .eq("id", applicationId);

  if (error) throw new Error(error.message);
};
