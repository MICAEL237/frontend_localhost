import z from "zod";

export const LoginSchema = z.object({
    email: z.email("Addresse mail invalid"),
    password: z.string().min(8, "votre mot de passe doit avoir au moins 8 caracteres")
})

export type LoginType = z.infer<typeof LoginSchema> 