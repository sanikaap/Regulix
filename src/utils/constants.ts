export const INDUSTRIES = [
  "BNPL",
  "Lending",
  "Crypto",
  "Payments",
  "InsurTech",
  "WealthTech",
  "Other",
];

export const JURISDICTIONS = [
  "United States",
  "United Kingdom",
  "European Union",
  "Germany",
  "France",
  "Singapore",
  "Australia",
];

export const PRODUCT_TYPES = [
  "Consumer Lending",
  "BNPL",
  "Crypto Exchange",
  "Stablecoin Payments",
  "Embedded Finance",
  "Insurance",
  "Investment Platform",
];

export const TECH_STACKS = [
  "AWS",
  "GCP",
  "Azure",
  "Stripe",
  "Plaid",
  "Twilio",
  "Salesforce",
  "Other",
];

export const REVENUE_BANDS = ["<$1M", "$1M–$10M", "$10M–$50M", "$50M+"];

export const STATUS_TYPES = ["Final Rule", "Proposed", "Guidance"] as const;
export type StatusType = (typeof STATUS_TYPES)[number];

export const EFFORT_LEVELS = ["Easy", "Medium", "Hard"] as const;
export type EffortLevel = (typeof EFFORT_LEVELS)[number];

export const ACTION_STATUSES = ["Pending", "Done", "Dismissed"] as const;
export type ActionStatus = (typeof ACTION_STATUSES)[number];
