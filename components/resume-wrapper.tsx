"use client";

import { useResume } from "@/contexts/resume-context";
import { Download, Loader2, Check } from "lucide-react";
import { ChartPie } from "./charts/pie";
import { Button } from "./ui/button";
import { FeedbackResults } from "@/types";
import { toast } from "sonner";

const ChartsResults = ({ result }: { result: FeedbackResults }) => {
  if (!result?.overall_score) return <>{result?.summary}</>;
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="col-span-full md:col-span-2">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gradient">
                Overall Score
              </h3>
              <div className="text-3xl font-bold text-primary">
                {result.overall_score}%
              </div>
            </div>
            <p className="text-muted-foreground">{result.summary}</p>
          </div>
        </div>
        <div className="col-span-full md:col-span-1">
          <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-background via-background to-muted/30">
            <h3 className="text-xl font-semibold text-gradient mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">ATS Score</span>
                <span className="font-semibold">
                  {result.ATS_optimization}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Clarity</span>
                <span className="font-semibold">{result.clarity}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Grammar</span>
                <span className="font-semibold">{result.grammar}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-background via-background to-muted/30">
          <h3 className="text-xl font-semibold text-gradient mb-6">
            Detailed Analysis
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <ChartPie
              color="chart1"
              resume_key="clarity"
              label="Readability"
              value={result.clarity}
              description="How clear and readable your resume is"
            />
            <ChartPie
              color="chart2"
              resume_key="relevance"
              label="Relevance"
              value={result.relevance}
              description="Alignment with job requirements"
            />
            <ChartPie
              color="chart3"
              resume_key="grammar"
              label="Grammar"
              value={result.grammar}
              description="Language accuracy and professionalism"
            />
            <ChartPie
              color="chart4"
              resume_key="structure"
              label="Structure"
              value={result.structure}
              description="Organization and layout quality"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-background via-background to-muted/30">
            <h3 className="text-xl font-semibold text-gradient mb-4">
              Key Strengths
            </h3>
            <ul className="space-y-3">
              {result.strengths.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-background via-background to-muted/30">
            <h3 className="text-xl font-semibold text-gradient mb-4">
              Areas to Improve
            </h3>
            <ul className="space-y-3">
              {result.improvements.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export function ResumeWrapper() {
  const { result, error, isLoading, resetAnalysis } = useResume();

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

  if (isLoading) {
    return (
      <div className="text-center py-20 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <p className="text-lg text-muted-foreground">
          Analyzing your resume...
        </p>
        <p className="text-sm text-muted-foreground/60">
          This may take a few moments
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-20">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-4 rounded-lg">
          <p className="font-medium">Error</p>
          <p className="text-sm mt-1">{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={resetAnalysis}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div id="wrapper" className="max-w-6xl mx-auto px-6 xl:px-0 py-20">
      <div className="space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gradient">Analysis Results</h2>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export Results
            </Button>
            <Button variant="outline" size="sm" onClick={resetAnalysis}>
              Analyze Another Resume
            </Button>
          </div>
        </div>

        <ChartsResults result={result} />
      </div>
    </div>
  );
}
