export const CandidateSource = {
  MANUAL: "MANUAL",
  REFERRAL: "REFERRAL",
  CAREERS_PAGE: "CAREERS_PAGE",
  LINKEDIN: "LINKEDIN",
  INDEED: "INDEED",
  IMPORT: "IMPORT",
  OTHER: "OTHER",
} as const;

export type CandidateSource =
  (typeof CandidateSource)[keyof typeof CandidateSource];
