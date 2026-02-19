export const loginUser = async (_email: string, _password: string) => {
  await new Promise((r) => setTimeout(r, 300));
  return { success: true };
};

export const registerUser = async (
  _name: string,
  _email: string,
  _password: string,
) => {
  await new Promise((r) => setTimeout(r, 300));
  return { success: true };
};
