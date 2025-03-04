"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FeedbackResults } from "@/types";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function ResumeUploader({
  setResponse,
  setError,
}: {
  setResponse: (data: FeedbackResults) => void;
  setError: (error: any) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // Handle file selection via drag and drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
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
  });

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/chat/resume-file", {
        method: "POST",
        body: formData,
      });

      const data: FeedbackResults = await res.json();
      setResponse(data);
      setFile(null);
      router.push("#wrapper");
    } catch (error) {
      setError(error as any);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      id="input"
      className="flex max-w-4xl mx-auto flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg "
    >
      {/* Drag & Drop Zone */}
      <div
        {...getRootProps()}
        className={`w-full p-10 text-center cursor-pointer transition ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <p className="text-lg font-semibold text-blue-600">{file.name}</p>
        ) : isDragActive ? (
          <p className="text-lg text-blue-500">Drop the file here...</p>
        ) : (
          <p className="text-lg text-gray-600">
            Drag & drop a resume here, or click to upload
          </p>
        )}
      </div>

      {/* Upload Button */}
      <Button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? "Uploading..." : "Upload & Analyze"}
      </Button>
    </div>
  );
}
