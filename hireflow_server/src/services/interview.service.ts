import { supabase } from "../db/supabase.js";

import {
  Interview,
  CreateInterviewDto,
  UpdateInterviewDto,
} from "../types/interview.types.js";

export const getInterviews = async (
  companyId: string,
  applicationId: string,
): Promise<Interview[]> => {
  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("company_id", companyId)
    .eq("application_id", applicationId)
    .is("deleted_at", null)
    .order("starts_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

export const getInterviewById = async (
  companyId: string,
  interviewId: string,
): Promise<Interview> => {
  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("company_id", companyId)
    .eq("id", interviewId)
    .is("deleted_at", null)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const createInterview = async (
  companyId: string,
  payload: CreateInterviewDto,
): Promise<Interview> => {
  const { data, error } = await supabase
    .from("interviews")
    .insert({
      company_id: companyId,
      status: payload.status ?? "SCHEDULED",
      title: payload.title ?? "Interview",
      ...payload,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateInterview = async (
  companyId: string,
  interviewId: string,
  payload: UpdateInterviewDto,
): Promise<Interview> => {
  const { data, error } = await supabase
    .from("interviews")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("company_id", companyId)
    .eq("id", interviewId)
    .is("deleted_at", null)
    .select()
    .limit(1);

  if (error) throw new Error(error.message);

  const interview = data?.[0];
  if (!interview) {
    throw new Error("Interview not found");
  }

  return interview;
};

export const deleteInterview = async (
  companyId: string,
  interviewId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("interviews")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("company_id", companyId)
    .eq("id", interviewId)
    .is("deleted_at", null);

  if (error) throw new Error(error.message);
};
