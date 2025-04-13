"use client";

import { Sparkles, History, Mail, Upload, BarChart3, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: Upload,
    title: "Bulk Resume Analysis",
    description:
      "Upload and analyze multiple resumes simultaneously. Perfect for recruiters and HR professionals.",
  },
  {
    icon: History,
    title: "Analysis History",
    description:
      "Access your complete history of analyzed resumes with detailed comparisons and trends over time.",
  },
  {
    icon: Mail,
    title: "Email Reports",
    description:
      "Automatically send beautifully formatted analysis reports to your email or share with others.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Get deeper insights with industry comparisons, keyword analysis, and personalized improvement suggestions.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

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

export default function ComingSoonPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Coming <span className="text-gradient">Soon</span>
            </h1>
          </motion.div>
          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            We&apos;re working hard to bring you an enhanced resume analysis
            experience. Our premium features will help you take your resume
            optimization to the next level.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Try Basic Analysis</Link>
            </Button>
          </motion.div>
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="glass-card card-gradient-light dark:card-gradient-dark p-8 rounded-2xl hover-lift"
                variants={item}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 },
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <motion.span
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon
                        className="h-6 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </motion.span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold leading-7">
                        {feature.title}
                      </h3>
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-16 rounded-3xl glass-card card-gradient-light dark:card-gradient-dark p-8 sm:p-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.01,
              transition: { type: "spring", stiffness: 400 },
            }}
          >
            <h3 className="text-2xl font-bold tracking-tight text-gradient">
              Early Access Program
            </h3>
            <p className="mt-4 text-muted-foreground">
              Join our early access program to be among the first to try these
              premium features. Early adopters will receive special pricing and
              direct access to our development team for feedback and feature
              requests.
            </p>
            <motion.div
              className="mt-6 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="button-gradient">Join Waitlist</Button>
              </motion.div>
              <span className="text-sm text-muted-foreground">
                Limited spots available
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
