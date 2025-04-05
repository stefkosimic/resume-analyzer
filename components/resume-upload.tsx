"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useResume } from "@/contexts/resume-context";
import { cn } from "@/utils/cn";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ResumeUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { analyzeResume, isLoading } = useResume();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    setSelectedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await analyzeResume(selectedFile);
      setSelectedFile(null);
    } catch (error) {
      // Error handling is managed by the context
      setSelectedFile(null);
    }
  };

  return (
    <div className="p-8 rounded-lg">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg bg-muted/60 p-8 text-center cursor-pointer transition-all",
          isDragActive
            ? "border-primary glass-card"
            : "border-muted-foreground/25 hover:border-primary/50",
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-medium mb-2">
          {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse files
        </p>
        <div className="text-xs text-muted-foreground/60">
          Supported formats: PDF, DOC, DOCX (max 5MB)
        </div>
      </div>

      {selectedFile && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg">
            <div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Button
                className="gap-2"
                onClick={handleUpload}
                disabled={isLoading}
              >
                {isLoading ? "Analyzing..." : "Upload and Analyze"}
              </Button>
              <Button variant="outline" onClick={() => setSelectedFile(null)}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
