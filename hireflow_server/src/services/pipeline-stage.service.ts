import { supabase } from "../db/supabase.js";

import {
  PipelineStage,
  CreatePipelineStageDto,
  UpdatePipelineStageDto,
} from "../types/pipeline-stage.types.js";

// Ensures the pipeline template belongs to the authenticated company.

const verifyTemplateOwnership = async (
  templateId: string,
  companyId: string,
): Promise<void> => {
  const { data, error } = await supabase
    .from("pipeline_templates")
    .select("id")
    .eq("id", templateId)
    .eq("company_id", companyId)
    .is("deleted_at", null)
    .single();

  if (error || !data) {
    throw new Error("Pipeline template not found.");
  }
};

// Returns all active stages for a template.

export const list = async (
  companyId: string,
  templateId: string,
): Promise<PipelineStage[]> => {
  await verifyTemplateOwnership(templateId, companyId);

  const { data, error } = await supabase
    .from("pipeline_stages")
    .select("*")
    .eq("template_id", templateId)
    .is("deleted_at", null)
    .order("display_order");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Returns a single stage.

export const getById = async (
  companyId: string,
  templateId: string,
  stageId: string,
): Promise<PipelineStage> => {
  await verifyTemplateOwnership(templateId, companyId);

  const { data, error } = await supabase
    .from("pipeline_stages")
    .select("*")
    .eq("id", stageId)
    .eq("template_id", templateId)
    .is("deleted_at", null)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Creates a new stage.

export const create = async (
  companyId: string,
  templateId: string,
  payload: CreatePipelineStageDto,
): Promise<PipelineStage> => {
  await verifyTemplateOwnership(templateId, companyId);

  const { data, error } = await supabase
    .from("pipeline_stages")
    .insert({
      ...payload,
      template_id: templateId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Updates a stage.

export const update = async (
  companyId: string,
  templateId: string,
  stageId: string,
  payload: UpdatePipelineStageDto,
): Promise<PipelineStage> => {
  await verifyTemplateOwnership(templateId, companyId);

  const { data, error } = await supabase
    .from("pipeline_stages")
    .update(payload)
    .eq("id", stageId)
    .eq("template_id", templateId)
    .is("deleted_at", null)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Soft deletes a stage.

export const remove = async (
  companyId: string,
  templateId: string,
  stageId: string,
): Promise<void> => {
  await verifyTemplateOwnership(templateId, companyId);

  const { error } = await supabase
    .from("pipeline_stages")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", stageId)
    .eq("template_id", templateId)
    .is("deleted_at", null);

  if (error) {
    throw new Error(error.message);
  }
};
