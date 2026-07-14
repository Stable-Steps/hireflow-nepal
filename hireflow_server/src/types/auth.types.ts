export type UserRole =
  | "owner"
  | "admin"
  | "recruiter"
  | "hiring_manager"
  | "viewer";

export interface AuthUser {
  id: string;
  company_id: string;
  role: UserRole;
  email?: string;
}
