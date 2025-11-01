import { z } from "zod";

// Experience item schema
export const experienceItemSchema = z.object({
  title: z.string().describe("Job title or position name"),
  company: z.string().describe("Company or organization name"),
  score: z
    .number()
    .min(0)
    .max(100)
    .describe("Score for this experience entry (0-100)"),
  feedback: z.string().describe("Detailed feedback about this work experience"),
});

// Education schema
export const educationSchema = z.object({
  summary: z.string().describe("Summary of the educational background"),
  score: z.number().min(0).max(100).describe("Education section score (0-100)"),
});

// Identified skills schema
export const identifiedSkillsSchema = z.object({
  present: z
    .array(z.string())
    .describe("Skills that are present in the resume"),
  missing: z
    .array(z.string())
    .describe("Skills that should be added to the resume"),
});

// Main resume review result schema
export const resumeReviewResultSchema = z.object({
  overallScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Overall resume quality score from 0 to 100"),

  summary: z
    .string()
    .describe(
      "A comprehensive summary of the resume quality and key observations"
    ),

  identifiedSkills: identifiedSkillsSchema.describe(
    "Technical and soft skills identified in the resume, along with suggested skills to add"
  ),

  education: educationSchema.describe(
    "Assessment of the education section including score and feedback"
  ),

  experience: z
    .array(experienceItemSchema)
    .describe(
      "Array of work experience entries with individual scores and feedback"
    ),

  strengths: z
    .array(z.string())
    .describe("List of key strengths and positive aspects of the resume"),

  improvements: z
    .array(z.string())
    .describe("Areas where the resume could be improved"),

  recommendations: z
    .array(z.string())
    .describe("Specific actionable recommendations to enhance the resume"),

  fixes: z
    .array(z.string())
    .describe("Critical issues that need to be fixed immediately"),

  jobFit: z
    .number()
    .min(0)
    .max(100)
    .describe("Percentage match between resume and job description (0-100)"),
});

// Type inference from schema
export type ResumeReviewResult = z.infer<typeof resumeReviewResultSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type Education = z.infer<typeof educationSchema>;
export type IdentifiedSkills = z.infer<typeof identifiedSkillsSchema>;
