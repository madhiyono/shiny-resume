import { StructuredOutputParser } from "@langchain/core/output_parsers";
import {
  resumeReviewResultSchema,
  type ResumeReviewResult,
} from "@/types/schemas/result.schema";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

export async function createRAGChain() {
  const llm = new ChatOpenAI({
    model: "mistralai/mistral-7b-instruct:free",
    apiKey: process.env.OPENROUTER_API_KEY!,
    temperature: 0.3,
    maxTokens: 1500,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  const parser = StructuredOutputParser.fromZodSchema(resumeReviewResultSchema);

  const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are an expert resume reviewer and career coach. Your task is to analyze resumes and provide comprehensive, actionable feedback.

Analyze the resume carefully and provide:
- An overall quality score (0-100)
- Detailed assessment of skills, education, and experience
- Specific strengths and areas for improvement
- Actionable recommendations
- Job fit analysis based on the provided job description`,
    ],
    [
      "human",
      `Please analyze this resume and provide detailed feedback. 

  RESUME:
{resume}

JOB DESCRIPTION:
{jobDescription}

Provide a comprehensive review with scores, feedback, and recommendations.

{format_instructions}`,
    ],
  ]);

  const ragChain = RunnableSequence.from([promptTemplate, llm, parser]);

  return ragChain;
}

export async function analyzeResumeWithRAG(
  resume: string,
  jobDescription: string
): Promise<ResumeReviewResult> {
  const chain = await createRAGChain();

  const parser = StructuredOutputParser.fromZodSchema(resumeReviewResultSchema);
  const formatInstructions = parser.getFormatInstructions();

  const result = await chain.invoke({
    resume,
    jobDescription,
    format_instructions: formatInstructions,
  });

  return result;
}
