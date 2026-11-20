import z from "zod";

export const assignerSchema = z.object({
    userId: z.string(),
    signalementId: z.string(),
    createdBy: z.email()


})


export const assignerVerriy = z.object({
    userId: z.string(),
    signalementId: z.string(),

})

export type assignerType =  z.infer <typeof assignerSchema>
export type assignerIType =  z.infer <typeof assignerVerriy>

