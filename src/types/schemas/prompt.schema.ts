import { z } from "zod";

// Zod schema for form validation
export const resumeFormSchema = z.object({
  resume: z
    .instanceof(File, { message: "Resume file is required" })
    .refine(
      (file) => file.size <= 3 * 1024 * 1024,
      "File size must be less than 3MB"
    )
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Only PDF and Word documents (.doc, .docx) are accepted"
    ),
  jobDescription: z.string().optional(),
});
