import { supabase } from "../db/supabase.js";
import { DEFAULT_PIPELINE_STAGES } from "../constants/pipeline.js";

export const createDefaultPipeline = async (
  companyId: string,
): Promise<void> => {
  // 1. Create default pipeline template
  const { data: template, error: templateError } = await supabase
    .from("pipeline_templates")
    .insert({
      company_id: companyId,
      name: "Hiring Pipeline",
      description: "Default hiring workflow",
      is_default: true,
    })
    .select()
    .single();

  if (templateError) {
    throw new Error(templateError.message);
  }

  // 2. Build stage payload
  const stages = DEFAULT_PIPELINE_STAGES.map((stage) => ({
    ...stage,
    template_id: template.id,
  }));

  // 3. Insert all stages in one query
  const { error: stageError } = await supabase
    .from("pipeline_stages")
    .insert(stages);

  if (stageError) {
    // Cleanup to avoid orphan template
    await supabase.from("pipeline_templates").delete().eq("id", template.id);

    throw new Error(stageError.message);
  }
};
