export const EmailDirection = {
  OUTBOUND: "OUTBOUND",
  INBOUND: "INBOUND",
} as const;

export type EmailDirection =
  (typeof EmailDirection)[keyof typeof EmailDirection];

export const EmailStatus = {
  DRAFT: "DRAFT",
  SENT: "SENT",
  FAILED: "FAILED",
  RECEIVED: "RECEIVED",
} as const;

export type EmailStatus = (typeof EmailStatus)[keyof typeof EmailStatus];
