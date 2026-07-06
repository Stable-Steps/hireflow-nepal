export type StageColor =
  | "gray"
  | "blue"
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "pink";

export interface PipelineStage {
  id: string;

  template_id: string;

  name: string;

  color: StageColor;

  display_order: number;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PipelineStageParams {
  templateId: string;
  stageId: string;
}

export interface CreatePipelineStageDto {
  name: string;

  color: StageColor;

  display_order: number;
}

export interface UpdatePipelineStageDto {
  name?: string;

  color?: StageColor;

  display_order?: number;
}
