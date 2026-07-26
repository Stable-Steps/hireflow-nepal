export interface Note {
  id: string;

  company_id: string;

  application_id: string;

  author_id: string | null;

  content: string;

  created_at: string;

  updated_at: string;

  deleted_at: string | null;
}

export interface CreateNoteDto {
  application_id: string;
  content: string;
}

export interface UpdateNoteDto {
  content: string;
}

export interface NoteParams {
  id: string;
}
