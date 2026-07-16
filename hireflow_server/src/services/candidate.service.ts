import { supabase } from "../db/supabase.js";

import {
  Candidate,
  CreateCandidateDto,
  UpdateCandidateDto,
} from "../types/candidate.types.js";

export const getAllCandidates = async (
  companyId: string,
): Promise<Candidate[]> => {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("company_id", companyId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCandidateById = async (
  companyId: string,
  candidateId: string,
): Promise<Candidate> => {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("company_id", companyId)
    .eq("id", candidateId)
    .is("deleted_at", null)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createCandidate = async (
  companyId: string,
  payload: CreateCandidateDto,
): Promise<Candidate> => {
  const { data, error } = await supabase
    .from("candidates")
    .insert({
      company_id: companyId,
      ...payload,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateCandidate = async (
  companyId: string,
  candidateId: string,
  payload: UpdateCandidateDto,
): Promise<Candidate> => {
  const { data, error } = await supabase
    .from("candidates")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("company_id", companyId)
    .eq("id", candidateId)
    .is("deleted_at", null)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteCandidate = async (
  companyId: string,
  candidateId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("candidates")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("company_id", companyId)
    .eq("id", candidateId);

  if (error) {
    throw new Error(error.message);
  }
};
