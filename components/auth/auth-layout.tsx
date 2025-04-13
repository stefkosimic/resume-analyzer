"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <motion.div
      className="relative flex min-h-screen overflow-hidden bg-gradient-to-b from-background to-muted"
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
          className="absolute top-1/2 right-20 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />
      </motion.div>

      <div className="container relative mx-auto flex min-h-screen items-center px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left side - Form */}
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              className="flex flex-col items-start justify-center space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-full">
                <Link href="/" className="mb-16 flex items-center space-x-2">
                  <Image src="/logo.svg" alt="logo" width={32} height={32} />
                  <div>
                    <span className="font-bold text-gradient">Resume</span>
                    <span className="font-bold">Analyzer</span>
                  </div>
                </Link>

                <motion.div
                  className="mt-8 max-w-2xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.h1
                    className="text-4xl font-bold tracking-tight sm:text-6xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {title}
                  </motion.h1>
                  <motion.p
                    className="mt-6 text-lg leading-8 text-muted-foreground"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {subtitle}
                  </motion.p>
                </motion.div>

                <div className="mt-12 flex flex-col space-y-4">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>AI-Powered Resume Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>Instant Feedback & Insights</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>Optimize Your Job Search</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
