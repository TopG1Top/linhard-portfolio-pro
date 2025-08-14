import { z } from "zod"
export const contactSchema = z.object({
  name: z.string().min(2, "Name ist zu kurz").max(80, "Name ist zu lang"),
  email: z.string().email("Ungültige E‑Mail"),
  message: z.string().min(10, "Bitte gib etwas mehr Kontext").max(2000, "Nachricht zu lang"),
})
export type ContactInput = z.infer<typeof contactSchema>
