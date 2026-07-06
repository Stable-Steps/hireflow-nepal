export interface PipelineTemplate {
  id: string;

  company_id: string;

  name: string;
  description: string | null;

  is_default: boolean;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PipelineTemplateParams {
  templateId: string;
}

export interface CreatePipelineTemplateDto {
  name: string;
  description?: string;
  is_default?: boolean;
}

export interface UpdatePipelineTemplateDto {
  name?: string;
  description?: string;
  is_default?: boolean;
}
