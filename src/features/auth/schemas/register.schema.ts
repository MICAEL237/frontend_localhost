import z  from 'zod'

export const RegisterSchema = z.object({
    first_name: z.string().min(1, "Veuillez renseigner votre nom").max(155),
    last_name:  z.string().min(1, "Veuillez renseigner votre nom").max(255),
    password: z.string().min(8, "Le mot de passe dois avoir minimum 8 caracteres"),
    email: z.email("Veuillez mentionner votre email"),
    tel: z.string().min(9, "Le numero de telephone doit avoir au moin 9 caracteres"),
})

export type RegisterType = z.infer<typeof RegisterSchema> 