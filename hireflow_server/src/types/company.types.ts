export interface Company {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  created_at: string;
  deleted_at: string | null;
}

export interface CreateCompanyDto {
  name: string;
  slug: string;
  logo_url?: string | null;
}

export interface CompanyParams {
  id: string;
}

export interface UpdateCompanyDto {
  name?: string;
  slug?: string;
  logo_url?: string | null;
}
