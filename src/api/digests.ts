export interface Digest {
  id: string;
  weekStart: string;
  weekEnd: string;
  itemsCount: number;
  highlights: string[];
  sentAt: string;
}

const mockDigests: Digest[] = [
  {
    id: "d1",
    weekStart: "2026-02-09",
    weekEnd: "2026-02-15",
    itemsCount: 5,
    highlights: [
      "DORA Article 11 deadline approaching — ICT risk assessment due in 47 days",
      "New CFPB enforcement guidance published on BNPL dispute resolution",
      "PSD3 draft comment period extended to September 2026",
    ],
    sentAt: "2026-02-16T08:00:00Z",
  },
  {
    id: "d2",
    weekStart: "2026-02-02",
    weekEnd: "2026-02-08",
    itemsCount: 3,
    highlights: [
      "FDIC finalized bank-fintech partnership guidelines — effective April 2026",
      "Two new pending actions created from regulation scan",
      "Relevance score updated for MiCA Title III after profile change",
    ],
    sentAt: "2026-02-09T08:00:00Z",
  },
  {
    id: "d3",
    weekStart: "2026-01-26",
    weekEnd: "2026-02-01",
    itemsCount: 7,
    highlights: [
      "CFPB proposed rule on BNPL published — high relevance (0.78)",
      "Completed 3 action items from DORA compliance workstream",
      "New PSD3 directive draft released by European Commission",
    ],
    sentAt: "2026-02-02T08:00:00Z",
  },
  {
    id: "d4",
    weekStart: "2026-01-19",
    weekEnd: "2026-01-25",
    itemsCount: 4,
    highlights: [
      "APRA CPS 230 operational risk standard published for consultation",
      "Quarterly compliance dashboard metrics exported and archived",
      "Team onboarded 2 new jurisdictions to monitoring scope",
    ],
    sentAt: "2026-01-26T08:00:00Z",
  },
];

export const fetchDigests = async (): Promise<Digest[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return mockDigests;
};
