import z from "zod";

export const UpdateRoleSchema = z.object({
    email: z.string(),
    role: z.string()
})




export type UpdateRoleType = z.infer<typeof UpdateRoleSchema> 