"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";

import { ArrowDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { ChartPie } from "./charts/pie";
import ResumeUploader from "./resume-upload";
import { Button } from "./ui/button";
import { FeedbackResults } from "@/types";

const ChartsResults = ({ result }: { result: FeedbackResults }) => {
  if (!result?.overall_score) return <>{result?.summary}</>;
  return (
    <div className="mx-auto gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <ChartPie
        color="chart-1"
        resume_key="clarity"
        label="Readability & Clarity"
        value={result.clarity}
        description="Measures how easy the resume is to read and understand, including structure and readability."
      />
      <ChartPie
        color="chart-2"
        resume_key="relevance"
        label="Job Relevance"
        value={result.relevance}
        description="Evaluates how well the resume aligns with the target job role and industry expectations."
      />
      <ChartPie
        color="chart-3"
        resume_key="grammar"
        label="Grammar & Language"
        value={result.grammar}
        description="Assesses spelling, grammar, and language accuracy to ensure professionalism."
      />
      <ChartPie
        color="chart-4"
        resume_key="ATS_optimization"
        label="ATS Compatibility"
        value={result.ATS_optimization}
        description="Checks if the resume includes keywords and formatting that help it pass Applicant Tracking Systems (ATS)."
      />
      <ChartPie
        color="chart-5"
        resume_key="structure"
        label="Layout & Structure"
        value={result.structure}
        description="Analyzes the resume’s layout, section organization, and logical flow of information."
      />
      <ChartPie
        color="chart-6"
        resume_key="impact"
        label="Achievements & Impact"
        value={result.impact}
        description="Measures how effectively achievements and contributions are highlighted with quantifiable results."
      />
    </div>
  );
};

const testResult = {
  clarity: 85,
  relevance: 80,
  grammar: 90,
  structure: 75,
  impact: 80,
  ATS_optimization: 85,
  overall_score: 81,
  strengths: [
    "Strong technical skills in modern web development technologies.",
    "Diverse project experience showcasing a range of applications.",
    "Clear communication of role and expertise.",
  ],
  improvements: [
    "Improve the structure and organization of project descriptions for better clarity.",
    "Quantify achievements in past roles to demonstrate impact.",
    "Ensure consistent formatting throughout the document.",
  ],
  summary:
    "The resume presents a clear profile of a Full-stack Web Developer with strong technical skills and a variety of projects. However, some areas need improvement in terms of organization and detailed achievements.",
};

export function ResumeWrapper() {
  const [result, setResult] = useState<FeedbackResults | null>();
  const [error, setError] = useState<{ message: string } | null>(null);

  return (
    <div id="wrapper" className="max-w-6xl mx-auto px-6 xl:px-0 py-20">
      <>
        {error && error?.message}
        {!error?.message && <ChartsResults result={result!} />}
        {result && (
          <div className="py-10 mx-auto gap-10">
            <h3>Strengths</h3>
            <ul className="mb-10 list-disc list-inside">
              {result!.strengths.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3>Improvements</h3>
            <ul className="mb-10 list-disc list-inside">
              {result!.improvements.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div>
              <span>Overall:</span>
              <span>{result!.overall_score}%</span>
            </div>
            <p>{result!.summary}</p>
          </div>
        )}
      </>

      <ResumeUploader setResponse={setResult} setError={setError} />
    </div>
  );
}
