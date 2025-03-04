import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { Buffer } from "buffer";

// export const runtime = "edge";

const TEMPLATE = `
Analyze the provided resume and evaluate its quality based on clarity, relevance, grammar, and additional criteria:

- **Clarity**: Is the resume easy to read and well-structured?
- **Relevance**: Does it align with the target job or industry?
- **Grammar & Language**: Are there spelling or grammatical errors?
- **Structure & Formatting**: Is the information well-organized and logically structured?
- **Impact & Achievements**: Does the resume showcase quantifiable achievements?
- **ATS Optimization**: Does it include relevant industry terms for ATS (Applicant Tracking Systems)?
- **Length & Conciseness**: Is it the right length (1-2 pages), or is it too long/short?

Provide a **structured JSON response** with the following information:
1. **Clarity** (percentage score)
2. **Relevance** (percentage score)
3. **Grammar** (percentage score)
4. **Structure** (percentage score)
5. **Impact** (percentage score)
6. **ATS Optimization** (percentage score)
7. **Overall Score** (final evaluation)
8. **Summary**: A brief overview of the resume's strengths and weaknesses.
9. **Strengths**: Key positive aspects.
10. **Areas for Improvement**: Specific recommendations.

NOTE: If the provided text does not resemble a resume or CV, return an appropriate message.

Resume:
{input}
`;

const schema = z
  .object({
    clarity: z.number().min(0).max(100),
    relevance: z.number().min(0).max(100),
    grammar: z.number().min(0).max(100),
    structure: z.number().min(0).max(100),
    impact: z.number().min(0).max(100),
    ATS_optimization: z.number().min(0).max(100),
    overall_score: z.number().min(0).max(100),
    strengths: z.array(z.string()),
    improvements: z.array(z.string()),
    summary: z.string(),
  })
  .describe("Structured feedback for resume evaluation.");

export async function POST(req: NextRequest) {
  try {
    // Get the form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          message: "No file uploaded",
          clarity: 0,
          relevance: 0,
          grammar: 0,
          structure: 0,
          impact: 0,
          ATS_optimization: 0,
          overall_score: 0,
          strengths: [],
          improvements: [],
          summary: "Please upload a resume file.",
        },
        { status: 400 },
      );
    }

    // Check file size (optional: 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          message: "File too large",
          clarity: 0,
          relevance: 0,
          grammar: 0,
          structure: 0,
          impact: 0,
          ATS_optimization: 0,
          overall_score: 0,
          strengths: [],
          improvements: [],
          summary: "File size exceeds 5MB limit.",
        },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    let inputText = "";

    // Handle different file types
    if (file.type === "application/pdf") {
      const pdfLoader = new PDFLoader(new Blob([buffer]), {
        splitPages: false,
      });
      const docs = await pdfLoader.load();
      inputText = docs.map((doc) => doc.pageContent).join("\n");
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const docxLoader = new DocxLoader(new Blob([buffer]));
      const docs = await docxLoader.load();
      inputText = docs.map((doc) => doc.pageContent).join("\n");
    } else {
      return NextResponse.json(
        {
          message: "Unsupported file type. Please upload PDF or DOCX.",
          clarity: 0,
          relevance: 0,
          grammar: 0,
          structure: 0,
          impact: 0,
          ATS_optimization: 0,
          overall_score: 0,
          strengths: [],
          improvements: [],
          summary: "Invalid file format.",
        },
        { status: 400 },
      );
    }

    if (!inputText) {
      return NextResponse.json(
        {
          message: "No content extracted from file.",
          clarity: 0,
          relevance: 0,
          grammar: 0,
          structure: 0,
          impact: 0,
          ATS_optimization: 0,
          overall_score: 0,
          strengths: [],
          improvements: [],
          summary: "Could not extract resume content.",
        },
        { status: 400 },
      );
    }

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);
    const model = new ChatOpenAI({
      temperature: 0.8,
      model: "gpt-4o-mini",
      maxTokens: 200,
    });

    const functionCallingModel = model.withStructuredOutput(schema, {
      name: "output_formatter",
    });

    const chain = prompt.pipe(functionCallingModel);

    const result = await chain.invoke({
      input: inputText,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    const errorResponse = {
      message: "Error processing resume feedback.",
      clarity: 0,
      relevance: 0,
      grammar: 0,
      structure: 0,
      impact: 0,
      ATS_optimization: 0,
      overall_score: 0,
      strengths: [],
      improvements: [],
      summary:
        e.message || "An unexpected error occurred while processing the file.",
    };
    return NextResponse.json(errorResponse, { status: e.status ?? 500 });
  }
}
