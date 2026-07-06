import { supabase } from "../db/supabase.js";

import {
  PipelineTemplate,
  CreatePipelineTemplateDto,
  UpdatePipelineTemplateDto,
} from "../types/pipeline-template.types.js";

export const list = async (companyId: string): Promise<PipelineTemplate[]> => {
  const { data, error } = await supabase
    .from("pipeline_templates")
    .select("*")
    .eq("company_id", companyId)
    .is("deleted_at", null)
    .order("created_at");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getById = async (
  id: string,
  companyId: string,
): Promise<PipelineTemplate> => {
  const { data, error } = await supabase
    .from("pipeline_templates")
    .select("*")
    .eq("id", id)
    .eq("company_id", companyId)
    .is("deleted_at", null)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const create = async (
  companyId: string,
  payload: CreatePipelineTemplateDto,
): Promise<PipelineTemplate> => {
  const { data, error } = await supabase
    .from("pipeline_templates")
    .insert({
      ...payload,
      company_id: companyId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const update = async (
  id: string,
  companyId: string,
  payload: UpdatePipelineTemplateDto,
): Promise<PipelineTemplate> => {
  const { data, error } = await supabase
    .from("pipeline_templates")
    .update(payload)
    .eq("id", id)
    .eq("company_id", companyId)
    .is("deleted_at", null)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const remove = async (id: string, companyId: string): Promise<void> => {
  const { error } = await supabase
    .from("pipeline_templates")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("company_id", companyId)
    .is("deleted_at", null);

  if (error) {
    throw new Error(error.message);
  }
};
