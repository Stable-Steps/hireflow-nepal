import * as CompanyService from "./company.service.js";
import * as UserService from "./user.service.js";
import { createDefaultPipeline } from "./default-pipeline.service.js";

import { Company, CreateCompanyDto } from "../types/company.types.js";

export const onboardCompany = async (
  userId: string,
  payload: CreateCompanyDto,
): Promise<Company> => {
  // Create the company
  const company = await CompanyService.createCompany(payload);

  // Assign the current user as owner
  await UserService.assignUserToCompany(userId, company.id, "owner");

  // Seed the default hiring pipeline
  await createDefaultPipeline(company.id);

  return company;
};
