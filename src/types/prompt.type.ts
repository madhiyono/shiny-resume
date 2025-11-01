import { z } from "zod";
import { resumeFormSchema } from "./schemas/prompt.schema";

export type ResumeFormData = z.infer<typeof resumeFormSchema>;
