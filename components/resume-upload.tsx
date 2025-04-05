"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FeedbackResults } from "@/types";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ResumeUploader({
  setResponse,
  setError,
  setIsLoading,
}: {
  setResponse: (data: FeedbackResults) => void;
  setError: (error: any) => void;
  setIsLoading: (loading: boolean) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // Handle file selection via drag and drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];

      // Validate file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error(
          "File size exceeds 5MB limit. Please choose a smaller file.",
        );
        return;
      }

      setFile(selectedFile);
      toast.success("File selected successfully!");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    setIsLoading(true);
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
      setResponse(data);
      setFile(null);
      toast.success("Resume analyzed successfully!");
      router.push("#wrapper");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError({ message: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      setIsLoading(false);
    }
  };

  return (
    <div
      id="input"
      className="flex max-w-4xl mx-auto flex-col items-center p-8 glass-card rounded-xl transition-all duration-200 hover-lift border-gradient"
      role="region"
      aria-label="Resume upload area"
    >
      {/* Drag & Drop Zone */}
      <div
        {...getRootProps()}
        className={`w-full p-12 text-center cursor-pointer transition-all duration-200 rounded-xl ${
          isDragActive
            ? "border-2 border-indigo-500/80 bg-indigo-50/50 shadow-inner"
            : "border-2 border-dashed border-muted hover:border-indigo-500/50 hover:bg-indigo-50/30"
        }`}
        role="button"
        aria-label="Drop zone for resume upload"
      >
        <input {...getInputProps()} aria-label="File input" />
        <div className="flex flex-col items-center gap-6">
          <div
            className={`p-4 rounded-full ${
              isDragActive ? "bg-indigo-100" : "bg-muted"
            }`}
          >
            <Upload
              className={`h-10 w-10 ${
                isDragActive ? "text-indigo-500" : "text-muted-foreground"
              }`}
            />
          </div>
          {file ? (
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gradient">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : isDragActive ? (
            <p className="text-lg font-medium text-indigo-500">
              Drop the file here...
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-lg font-medium text-gradient">
                Drag & drop a resume here
              </p>
              <p className="text-base text-muted-foreground">
                or click to browse files
              </p>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
            <span className="font-medium">Supported formats:</span>
            <span className="text-foreground">PDF, DOCX</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-foreground">Max size: 5MB</span>
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <Button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`mt-6 min-w-[200px] h-11 button-gradient ${
          isUploading ? "opacity-90" : ""
        }`}
        aria-label={
          isUploading ? "Uploading resume..." : "Upload and analyze resume"
        }
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="font-medium">Analyzing...</span>
          </>
        ) : (
          <span className="font-medium">Upload & Analyze</span>
        )}
      </Button>
    </div>
  );
}
