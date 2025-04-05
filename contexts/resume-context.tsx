"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { FeedbackResults } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ResumeContextType {
  result: FeedbackResults | null;
  error: string | null;
  isLoading: boolean;
  analyzeResume: (file: File) => Promise<void>;
  resetAnalysis: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<FeedbackResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const analyzeResume = async (file: File) => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/chat/resume-file", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to analyze resume");
      }

      const data: FeedbackResults = await res.json();
      setResult(data);
      toast.success("Resume analyzed successfully!");
      router.push("#wrapper");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return (
    <ResumeContext.Provider
      value={{
        result,
        error,
        isLoading,
        analyzeResume,
        resetAnalysis,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
