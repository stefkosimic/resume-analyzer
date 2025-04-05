"use client";

import type React from "react";
import { useState } from "react";
import {
  Upload,
  CheckCircle,
  FileText,
  Zap,
  Award,
  BarChart,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

export default function ResumeAnalyzerJumbotron() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDrop: () => setIsDragging(false),
  });

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left side - Drag and Drop */}
            <div className="flex flex-col items-center justify-center">
              <div
                {...getRootProps()}
                className={`relative flex h-[400px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200 ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Cloud className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">
                      {isDragActive
                        ? "Drop your resume here"
                        : "Drag & drop your resume"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      or click to browse files
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="flex flex-col items-start justify-center space-y-8">
              <div className="flex items-center gap-2">
                <Image alt="logo" src="/logo.svg" width={50} height={50} />
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  Resume
                  <span className="text-primary">Analyzer</span>
                </h1>
              </div>

              <div className="space-y-4">
                <h2 className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  AI-Powered Resume Feedback
                </h2>

                <p className="text-xl text-muted-foreground">
                  Get instant feedback, optimize your resume, and boost your
                  chances of landing your dream job.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <MetricCard
                  title="ATS Score"
                  percentage={95}
                  icon={<FileText className="h-4 w-4 text-chart1" />}
                  color="chart1"
                />
                <MetricCard
                  title="Keyword Match"
                  percentage={88}
                  icon={<CheckCircle className="h-4 w-4 text-chart2" />}
                  color="chart2"
                />
                <MetricCard
                  title="Impact Score"
                  percentage={92}
                  icon={<Award className="h-4 w-4 text-chart3" />}
                  color="chart3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      bg: "bg-chart1/10",
      ring: "ring-chart1/20",
      text: "text-chart1",
      progressBg: "bg-chart1/20",
      progressFill: "bg-chart1",
    },
    chart2: {
      bg: "bg-chart2/10",
      ring: "ring-chart2/20",
      text: "text-chart2",
      progressBg: "bg-chart2/20",
      progressFill: "bg-chart2",
    },
    chart3: {
      bg: "bg-chart3/10",
      ring: "ring-chart3/20",
      text: "text-chart3",
      progressBg: "bg-chart3/20",
      progressFill: "bg-chart3",
    },
  };

  const styles = colorMap[color];

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${styles.bg} p-6 ring-1 ${styles.ring} transition-all duration-200 hover:shadow-lg`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium text-foreground">{title}</h3>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm">
          {icon}
        </span>
      </div>

      <div className="mb-2 flex items-end justify-between">
        <div className={`text-4xl font-bold ${styles.text}`}>{percentage}%</div>
        <Zap className="h-5 w-5 text-accent" />
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
