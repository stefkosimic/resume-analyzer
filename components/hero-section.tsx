"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { Upload, CheckCircle, FileText, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useResume } from "@/contexts/resume-context";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function ResumeAnalyzerJumbotron() {
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
      setSelectedFile(null);
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-b from-background to-muted"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />
      </motion.div>

      <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left side - Drag and Drop */}
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* @ts-ignore */}
              <motion.div
                {...getRootProps()}
                className={`relative flex h-[400px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200 ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input {...getInputProps()} />
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <motion.p
                    className="text-lg flex flex-col text-center font-medium mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {isDragActive
                      ? "Drop your resume here"
                      : "Drag & drop your resume"}

                    <span className="text-xs text-muted-foreground/60">
                      or click to browse files
                    </span>
                    <span className="text-xs text-muted-foreground/60">
                      Supported formats: PDF, DOC, DOCX (max 5MB)
                    </span>
                  </motion.p>

                  <motion.div
                    className="text-xs text-muted-foreground/60"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  ></motion.div>
                </motion.div>
              </motion.div>

              {selectedFile && (
                <motion.div
                  className="mt-6 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="gap-2"
                          onClick={handleUpload}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            "Upload and Analyze"
                          )}
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setSelectedFile(null)}
                          className="h-9 w-9"
                        >
                          <motion.div
                            initial={{ rotate: 0 }}
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                          >
                            ✕
                          </motion.div>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              className="flex flex-col items-start justify-center space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="mx-auto max-w-2xl text-center"
                variants={item}
              >
                <motion.h1
                  className="text-4xl font-bold tracking-tight sm:text-6xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Optimize Your <span className="text-gradient">Resume</span>{" "}
                  with AI
                </motion.h1>
                <motion.p
                  className="mt-6 text-lg leading-8 text-muted-foreground"
                  variants={item}
                >
                  Get instant feedback on your resume. Our AI-powered analysis
                  helps you improve your chances of landing your dream job.
                </motion.p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <MetricCard
                  title="Resume Score"
                  percentage={85}
                  icon={<CheckCircle className="h-6 w-6 text-primary" />}
                  color="chart1"
                />
                <MetricCard
                  title="Job Match"
                  percentage={75}
                  icon={<FileText className="h-6 w-6 text-primary" />}
                  color="chart2"
                />
                <MetricCard
                  title="Application Rate"
                  percentage={90}
                  icon={<Zap className="h-6 w-6 text-primary" />}
                  color="chart3"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface MetricCardProps {
  title: string;
  percentage: number;
  icon: React.ReactNode;
  color: "chart1" | "chart2" | "chart3";
}

function MetricCard({ title, percentage, icon, color }: MetricCardProps) {
  const colorMap = {
    chart1: {
      ring: "ring-chart1/20",
      progressBg: "bg-chart1/20",
      progressFill: "bg-chart1",
    },
    chart2: {
      ring: "ring-chart2/20",
      progressBg: "bg-chart2/20",
      progressFill: "bg-chart2",
    },
    chart3: {
      ring: "ring-chart3/20",
      progressBg: "bg-chart3/20",
      progressFill: "bg-chart3",
    },
  };

  const styles = colorMap[color];

  return (
    <div
      className={`relative overflow-hidden rounded-xl card-gradient-dark border p-4 ring-1 ${styles.ring} transition-all duration-200`}
    >
      <div className="mb-4 flex items-center w-full gap-4 justify-between">
        <h2 className="font-medium text-sm text-foreground">{title}</h2>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm">
          {icon}
        </span>
      </div>

      <div className="mb-2 flex items-end justify-between">
        <div className={`text-4xl font-bold`}>{percentage}%</div>
        <Zap className="h-5 w-5 text-primary" />
      </div>

      <div
        className={`h-2 w-full overflow-hidden rounded-full ${styles.progressBg}`}
      >
        <div
          className={`h-full rounded-full ${styles.progressFill}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
