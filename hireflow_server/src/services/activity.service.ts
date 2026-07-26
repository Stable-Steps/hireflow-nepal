import { supabase } from "../db/supabase.js";

import { Activity, CreateActivityDto } from "../types/activity.types.js";

export const getActivities = async (
  companyId: string,
  applicationId: string,
): Promise<Activity[]> => {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("company_id", companyId)
    .eq("application_id", applicationId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const createActivity = async (
  companyId: string,
  payload: CreateActivityDto,
): Promise<Activity> => {
  const { data, error } = await supabase
    .from("activities")
    .insert({
      company_id: companyId,
      ...payload,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};
