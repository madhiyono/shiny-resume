import { NextRequest, NextResponse } from "next/server";
import { analyzeResumeWithRAG } from "@/lib/rag-chain";
import { UnstructuredLoader } from "@langchain/community/document_loaders/fs/unstructured";

export async function POST(request: NextRequest) {
  try {
    // Dynamic import of pdf-parse to avoid module-level file access
    const pdf = (await import("pdf-parse")).default;
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error: API key not found" },
        { status: 500 }
      );
    }

    // Parse multipart form data
    const formData = await request.formData();
    const resumeFile = formData.get("resume") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    // Validate inputs
    if (!resumeFile) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    const finalJobDescription =
      jobDescription ||
      "General job position requiring relevant skills and experience.";

    // Validate file type
    if (resumeFile.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are supported" },
        { status: 400 }
      );
    }

    // Convert File to Buffer for pdf-parse
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    let resumeText: string;
    let extractionMethod = "pdf-parse";

    try {
      const pdfData = await pdf(buffer);
      resumeText = pdfData.text;

      if (!resumeText || resumeText.trim().length < 100) {
        console.log(
          "pdf-parse extracted minimal text, trying UnstructuredPDFLoader..."
        );

        // Fallback to UnstructuredPDFLoader for better OCR support
        try {
          const loader = new UnstructuredLoader({
            buffer: buffer,
            fileName: resumeFile.name,
          });

          const docs = await loader.load();
          resumeText = docs.map((doc) => doc.pageContent).join("\n");
          extractionMethod = "unstructured-loader";

          if (!resumeText || resumeText.trim().length < 50) {
            return NextResponse.json(
              {
                error:
                  "Could not extract text from PDF. The file might be heavily image-based or corrupted.",
                suggestion:
                  "Please try converting your PDF to a text-based format or use a different file.",
              },
              { status: 400 }
            );
          }
        } catch (unstructuredError) {
          console.error("UnstructuredLoader error:", unstructuredError);
          return NextResponse.json(
            {
              error:
                "Could not extract text from PDF. The file might be scanned or image-based.",
              suggestion:
                "Please upload a text-based PDF or convert your document.",
            },
            { status: 400 }
          );
        }
      }
    } catch (pdfError) {
      console.error("PDF parsing error:", pdfError);
      return NextResponse.json(
        { error: "Failed to parse PDF file" },
        { status: 500 }
      );
    }

    // Analyze the resume using RAG chain
    console.log("Starting resume analysis...");
    console.log("Resume text length:", resumeText.length);
    console.log("Job description length:", finalJobDescription.length);

    let analysis;
    try {
      analysis = await analyzeResumeWithRAG(resumeText, finalJobDescription);
    } catch (ragError) {
      console.error("RAG chain error:", ragError);
      return NextResponse.json(
        {
          error: "Failed to analyze resume with AI",
          details:
            ragError instanceof Error ? ragError.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: analysis,
        metadata: {
          fileName: resumeFile.name,
          fileSize: resumeFile.size,
          extractedTextLength: resumeText.length,
          extractionMethod: extractionMethod,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error analyzing resume:", error);

    return NextResponse.json(
      {
        error: "Failed to analyze resume",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
