import { create } from "zustand";

interface CompanyProfile {
  companyName: string;
  industry: string;
  jurisdictions: string[];
  productTypes: string[];
  techStack: string[];
  revenueBand: string;
}

interface ProfileState {
  company: CompanyProfile;
  completionPercent: number;
  updateProfile: (partial: Partial<CompanyProfile>) => void;
}

const calcCompletion = (c: CompanyProfile): number => {
  let filled = 0;
  let total = 6;
  if (c.companyName) filled++;
  if (c.industry) filled++;
  if (c.jurisdictions.length > 0) filled++;
  if (c.productTypes.length > 0) filled++;
  if (c.techStack.length > 0) filled++;
  if (c.revenueBand) filled++;
  return Math.round((filled / total) * 100);
};

export const useProfileStore = create<ProfileState>()((set) => ({
  company: {
    companyName: "",
    industry: "",
    jurisdictions: [],
    productTypes: [],
    techStack: [],
    revenueBand: "",
  },
  completionPercent: 0,
  updateProfile: (partial) =>
    set((state) => {
      const updated = { ...state.company, ...partial };
      return { company: updated, completionPercent: calcCompletion(updated) };
    }),
}));
