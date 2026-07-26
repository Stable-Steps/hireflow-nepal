import { supabase } from "../db/supabase.js";

import { Note, CreateNoteDto, UpdateNoteDto } from "../types/note.types.js";

export const getNotes = async (
  companyId: string,
  applicationId: string,
): Promise<Note[]> => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("company_id", companyId)
    .eq("application_id", applicationId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const createNote = async (
  companyId: string,
  payload: CreateNoteDto,
): Promise<Note> => {
  const { data, error } = await supabase
    .from("notes")
    .insert({
      company_id: companyId,
      ...payload,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const updateNote = async (
  companyId: string,
  noteId: string,
  payload: UpdateNoteDto,
): Promise<Note> => {
  const { data, error } = await supabase
    .from("notes")
    .update(payload)
    .eq("company_id", companyId)
    .eq("id", noteId)
    .is("deleted_at", null)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteNote = async (
  companyId: string,
  noteId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("notes")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("company_id", companyId)
    .eq("id", noteId)
    .is("deleted_at", null);

  if (error) throw new Error(error.message);
};
