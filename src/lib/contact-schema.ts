import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Enter a valid email"),
  projectType: z.string().min(1, "Pick one"),
  message: z.string().min(10, "Tell me a little more").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
