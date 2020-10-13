import bcrypt from "bcrypt";

export async function generateSalt(): Promise<string> {
  return await bcrypt.genSalt(10);
}

export async function hashPassword(password: string, passwordSalt: string): Promise<string> {
  console.log(password);
  console.log(passwordSalt);
  return await bcrypt.hash(password, passwordSalt);
}
