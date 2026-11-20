import z from "zod";


const MAX_FILE_SIZE = 1024 * 1024 * 8
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const SchemaSigna = z.object({
  id: z.string().optional(),
  description: z.string("Description du probleme obligatoire").min(4).max(600),
  lieu: z.string().min(4),
  categorie: z.string("veuillez mentionner une categorie"),
  commune: z.string("pas de commune"),
  image: z
  .custom<FileList>()
  .transform((filse) => filse[0])
.pipe(
    z.custom<File>((val) => val instanceof File, {
    message: 'Veuillez fournir un fichier valide.',
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `Le fichier est trop volumineux. La taille maximale est de 5 Mo.`,
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: 'Format de fichier non supporté. Formats acceptés : .jpg, .jpeg, .png, .webp',
  })
),
  latitude: z.string(),
  longitude: z.string()
});
export type TypeSigna = z.infer<typeof SchemaSigna>;

export type TypeISigna = z.input<typeof SchemaSigna>;
export type TypeOSigna = z.output<typeof SchemaSigna>;

