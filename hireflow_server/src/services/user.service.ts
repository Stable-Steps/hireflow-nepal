import { supabase } from "../db/supabase.js";

export const assignUserToCompany = async (
  userId: string,
  companyId: string,
  role: string,
): Promise<void> => {
  const { error } = await supabase
    .from("users")
    .update({
      company_id: companyId,
      role,
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
};
