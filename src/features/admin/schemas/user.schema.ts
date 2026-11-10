import z, { string } from "zod";

export const userSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  tel: z.string(),
  role: string()
});

export type userType = z.infer<typeof userSchema>;
export type roleType = "citoyen"| "agent_municipale"| "admin"