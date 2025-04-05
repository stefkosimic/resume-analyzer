"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";

import { ArrowDown, Download, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { ChartPie } from "./charts/pie";
import ResumeUploader from "./resume-upload";
import { Button } from "./ui/button";
import { FeedbackResults } from "@/types";
import { toast } from "sonner";

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
        description="Analyzes the resume's layout, section organization, and logical flow of information."
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
  const [result, setResult] = useState<FeedbackResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResponse = (data: FeedbackResults) => {
    setResult(data);
    setError(null);
  };

  const handleError = (err: { message: string }) => {
    setError(err.message);
    setResult(null);
    toast.error(err.message);
  };

  const handleExport = () => {
    if (!result) return;

    const exportData = {
      ...result,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-analysis-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Analysis exported successfully!");
  };

  return (
    <div id="wrapper" className="max-w-6xl mx-auto px-6 xl:px-0 py-20">
      {isLoading && (
        <div className="text-center py-10 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-lg text-muted-foreground">
            Analyzing your resume...
          </p>
          <p className="text-sm text-muted-foreground/60">
            This may take a few moments
          </p>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-4 rounded-lg mb-8">
          <p className="font-medium">Error</p>
          <p className="text-sm mt-1">{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => setError(null)}
          >
            Try Again
          </Button>
        </div>
      )}

      {!isLoading && !error && !result && (
        <ResumeUploader
          setResponse={handleResponse}
          setError={handleError}
          setIsLoading={setIsLoading}
        />
      )}

      {result && (
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gradient">
              Analysis Results
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export Results
            </Button>
          </div>

          <ChartsResults result={result} />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gradient">
                Strengths
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gradient">
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {result.improvements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gradient">
                Overall Assessment
              </h3>
              <div className="text-2xl font-bold text-primary">
                {result.overall_score}%
              </div>
            </div>
            <p className="text-foreground">{result.summary}</p>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setResult(null);
                setError(null);
              }}
            >
              Analyze Another Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
