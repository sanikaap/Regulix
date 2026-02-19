export interface ActionItem {
  id: string;
  action: string;
  regulationId: string;
  regulationTitle: string;
  deadline: string;
  effort: "Easy" | "Medium" | "Hard";
  status: "Pending" | "Done" | "Dismissed";
}

const mockActions: ActionItem[] = [
  {
    id: "a1",
    action:
      "Conduct ICT risk assessment per DORA Article 11 and document third-party dependencies.",
    regulationId: "dora-11",
    regulationTitle: "DORA Article 11",
    deadline: "2026-01-17",
    effort: "Hard",
    status: "Pending",
  },
  {
    id: "a2",
    action:
      "Review BNPL disclosure templates against Regulation Z requirements.",
    regulationId: "cfpb-bnpl",
    regulationTitle: "CFPB BNPL Rule",
    deadline: "2026-03-01",
    effort: "Medium",
    status: "Pending",
  },
  {
    id: "a3",
    action:
      "Map payment flows against PSD3 draft requirements for API compliance.",
    regulationId: "psd3-draft",
    regulationTitle: "PSD3 Payment Services",
    deadline: "2026-09-15",
    effort: "Hard",
    status: "Pending",
  },
  {
    id: "a4",
    action:
      "Prepare FDIC partnership compliance checklist for banking partner review.",
    regulationId: "fdic-fintech",
    regulationTitle: "FDIC Fintech Guidelines",
    deadline: "2026-04-01",
    effort: "Medium",
    status: "Pending",
  },
  {
    id: "a5",
    action:
      "Update incident reporting process to meet DORA 72-hour notification window.",
    regulationId: "dora-11",
    regulationTitle: "DORA Article 11",
    deadline: "2026-01-17",
    effort: "Easy",
    status: "Pending",
  },
  {
    id: "a6",
    action: "Submit MiCA exposure assessment memo to compliance committee.",
    regulationId: "mica-iii",
    regulationTitle: "MiCA Title III",
    deadline: "2026-06-30",
    effort: "Easy",
    status: "Pending",
  },
  {
    id: "a7",
    action: "Audit Stripe integration for PSD3 SCA requirements.",
    regulationId: "psd3-draft",
    regulationTitle: "PSD3 Payment Services",
    deadline: "2026-09-15",
    effort: "Medium",
    status: "Pending",
  },
  {
    id: "a8",
    action: "Establish DORA Article 11 ICT governance framework documentation.",
    regulationId: "dora-11",
    regulationTitle: "DORA Article 11",
    deadline: "2025-12-01",
    effort: "Hard",
    status: "Pending",
  },
  {
    id: "a9",
    action:
      "Completed annual AML/KYC policy review and filed updated documentation.",
    regulationId: "cfpb-bnpl",
    regulationTitle: "CFPB BNPL Rule",
    deadline: "2025-11-15",
    effort: "Medium",
    status: "Done",
  },
  {
    id: "a10",
    action:
      "Reviewed and updated privacy policy for GDPR Article 30 compliance.",
    regulationId: "mica-iii",
    regulationTitle: "MiCA Title III",
    deadline: "2025-11-01",
    effort: "Easy",
    status: "Done",
  },
  {
    id: "a11",
    action: "Filed quarterly transaction monitoring report with regulator.",
    regulationId: "fdic-fintech",
    regulationTitle: "FDIC Fintech Guidelines",
    deadline: "2025-10-30",
    effort: "Easy",
    status: "Done",
  },
  {
    id: "a12",
    action:
      "Dismissed low-relevance APRA CPS 230 assessment — no AU operations.",
    regulationId: "apra-cps230",
    regulationTitle: "APRA CPS 230",
    deadline: "2026-07-01",
    effort: "Easy",
    status: "Dismissed",
  },
];

export const fetchActions = async (): Promise<ActionItem[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return mockActions;
};
