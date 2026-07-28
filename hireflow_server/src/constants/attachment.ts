export const AttachmentType = {
  RESUME: "RESUME",
  COVER_LETTER: "COVER_LETTER",
  PORTFOLIO: "PORTFOLIO",
  CERTIFICATE: "CERTIFICATE",
  OTHER: "OTHER",
} as const;

export type AttachmentType =
  (typeof AttachmentType)[keyof typeof AttachmentType];
