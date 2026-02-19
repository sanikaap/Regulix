export const updateCompanyProfile = async (_data: Record<string, unknown>) => {
  await new Promise((r) => setTimeout(r, 300));
  return { success: true };
};
