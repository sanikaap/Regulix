export interface Regulation {
  id: string;
  title: string;
  body: string;
  jurisdiction: string;
  relevanceScore: number;
  deadline: string;
  status: "Final Rule" | "Proposed" | "Guidance";
  summary: string;
  publishedDate: string;
  severity: "High" | "Medium" | "Low";
  matchReasons: string[];
  actionRequired: string;
  effortEstimate: string;
}

const mockRegulations: Regulation[] = [
  {
    id: "dora-11",
    title: "DORA Article 11",
    body: "FCA",
    jurisdiction: "UK",
    relevanceScore: 0.91,
    deadline: "2026-01-17",
    status: "Final Rule",
    summary:
      "Digital Operational Resilience Act mandates ICT risk management frameworks for financial entities including third-party dependency mapping and incident reporting.",
    publishedDate: "2024-12-14",
    severity: "High",
    matchReasons: [
      "You operate in UK ✓",
      "You use AWS infrastructure ✓",
      "Your revenue band triggers enhanced oversight ✓",
      "BNPL products fall under DORA scope ✓",
    ],
    actionRequired:
      "Conduct ICT risk assessment and establish incident reporting process per DORA Article 11 requirements.",
    effortEstimate: "~2 days",
  },
  {
    id: "cfpb-bnpl",
    title: "CFPB BNPL Rule",
    body: "CFPB",
    jurisdiction: "US",
    relevanceScore: 0.78,
    deadline: "2026-03-01",
    status: "Proposed",
    summary:
      "Consumer Financial Protection Bureau proposed interpretive rule classifying BNPL providers as card issuers, requiring Regulation Z disclosures and dispute resolution.",
    publishedDate: "2025-01-10",
    severity: "High",
    matchReasons: [
      "Your BNPL product is directly affected ✓",
      "You operate in US ✓",
      "Consumer lending products require compliance ✓",
    ],
    actionRequired:
      "Review current BNPL disclosures against Reg Z requirements and prepare compliance gap analysis.",
    effortEstimate: "~3 days",
  },
  {
    id: "mica-iii",
    title: "MiCA Title III",
    body: "ESMA",
    jurisdiction: "EU",
    relevanceScore: 0.44,
    deadline: "2026-06-30",
    status: "Guidance",
    summary:
      "Markets in Crypto-Assets regulation Title III covers asset-referenced token issuance, reserve requirements, and redemption rights for stablecoin operations.",
    publishedDate: "2025-02-01",
    severity: "Medium",
    matchReasons: [
      "Limited exposure — no direct crypto exchange operations",
      "EU jurisdiction partially relevant",
    ],
    actionRequired:
      "Monitor for final guidance updates. No immediate action required unless crypto product expansion planned.",
    effortEstimate: "~1 day",
  },
  {
    id: "psd3-draft",
    title: "PSD3 Payment Services Directive",
    body: "EC",
    jurisdiction: "EU",
    relevanceScore: 0.82,
    deadline: "2026-09-15",
    status: "Proposed",
    summary:
      "Third Payment Services Directive expands open banking requirements, strengthens fraud liability frameworks, and introduces new licensing tiers for payment initiators.",
    publishedDate: "2025-01-20",
    severity: "High",
    matchReasons: [
      "Payments product directly affected ✓",
      "Embedded finance scope ✓",
      "Stripe integration requires PSD3 audit ✓",
    ],
    actionRequired:
      "Map current payment flows against PSD3 requirements and identify API changes needed.",
    effortEstimate: "~4 days",
  },
  {
    id: "fdic-fintech",
    title: "FDIC Fintech Partnership Guidelines",
    body: "FDIC",
    jurisdiction: "US",
    relevanceScore: 0.65,
    deadline: "2026-04-01",
    status: "Final Rule",
    summary:
      "New guidelines for bank-fintech partnerships requiring enhanced due diligence, capital adequacy provisions, and consumer data handling protocols.",
    publishedDate: "2025-01-05",
    severity: "Medium",
    matchReasons: [
      "Bank partnerships may be affected ✓",
      "US operations in scope ✓",
    ],
    actionRequired:
      "Review existing bank partnership agreements against new FDIC requirements.",
    effortEstimate: "~2 days",
  },
  {
    id: "apra-cps230",
    title: "APRA CPS 230 Operational Risk",
    body: "APRA",
    jurisdiction: "AU",
    relevanceScore: 0.38,
    deadline: "2026-07-01",
    status: "Final Rule",
    summary:
      "Prudential standard on operational risk management for regulated entities requiring business continuity planning and critical operations mapping.",
    publishedDate: "2024-11-15",
    severity: "Low",
    matchReasons: ["Limited Australian operations exposure"],
    actionRequired:
      "Assess if Australian operations meet CPS 230 materiality thresholds.",
    effortEstimate: "~1 day",
  },
];

export const fetchRegulations = async (): Promise<Regulation[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return mockRegulations;
};

export const fetchRegulationById = async (
  id: string,
): Promise<Regulation | undefined> => {
  await new Promise((r) => setTimeout(r, 200));
  return mockRegulations.find((r) => r.id === id);
};
