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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ResumeAnalyzerJumbotron() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-5xl">
          {/* Logo and title section */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-2">
              <Image alt="logo" src="/logo.svg" width={50} height={50} />
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Resume
                <span className="text-primary">Analyzer</span>
              </h1>
            </div>

            <h2 className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              AI-Powered Resume Feedback
            </h2>

            <p className="mb-10 max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
              Get instant feedback, optimize your resume, and boost your chances
              of landing your dream job.
            </p>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              className="mb-16"
            >
              <Button size="lg">
                <motion.span className="mr-2 flex items-center transition-transform duration-200 group-hover:scale-101">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Resume & Get Feedback
                </motion.span>
              </Button>
            </motion.div>

            {/* Metrics Cards */}
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
              <MetricCard
                title="Readability & Clarity"
                percentage={85}
                icon={<FileText className="h-5 w-5 text-chart1" />}
                color="chart1"
              />
              <MetricCard
                title="Job Relevance"
                percentage={100}
                icon={<BarChart className="h-5 w-5 text-chart2" />}
                color="chart2"
              />
              <MetricCard
                title="Grammar & Language"
                percentage={50}
                icon={<Award className="h-5 w-5 text-chart3" />}
                color="chart3"
              />
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
