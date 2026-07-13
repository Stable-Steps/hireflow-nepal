import { supabase } from "../db/supabase.js";
import {
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
} from "../types/company.types.js";

export const createCompany = async (
  payload: CreateCompanyDto,
): Promise<Company> => {
  const { data, error } = await supabase
    .from("companies")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCompanyById = async (companyId: string): Promise<Company> => {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", companyId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateCompany = async (
  companyId: string,
  payload: UpdateCompanyDto,
): Promise<Company> => {
  const { data, error } = await supabase
    .from("companies")
    .update(payload)
    .eq("id", companyId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
