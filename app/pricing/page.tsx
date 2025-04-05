"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out our resume analysis",
    features: [
      "Basic resume analysis",
      "3 resumes per month",
      "Standard response time",
      "Basic ATS compatibility check",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$12",
    description: "Unlock advanced features and unlimited analysis",
    features: [
      "Advanced resume analysis",
      "Unlimited resumes",
      "Priority response time",
      "Advanced ATS optimization",
      "Export detailed reports",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
    featured: true,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const listItem = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function PricingPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Simple, <span className="text-gradient">transparent</span> pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the perfect plan for your needs. Upgrade or downgrade at any
            time.
          </p>
        </motion.div>

        <motion.div
          className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              className={cn(
                "glass-card hover-lift rounded-3xl p-8 xl:p-10",
                tier.featured && "border-primary/50 ring-2 ring-primary/50",
              )}
              variants={item}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 400 },
              }}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h2 className="text-xl font-semibold leading-8 text-foreground">
                  {tier.name}
                </h2>
                {tier.featured && (
                  <motion.span
                    className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                      delay: 0.5,
                    }}
                  >
                    Most Popular
                  </motion.span>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {tier.price}
                </span>
                {tier.price !== "$0" && (
                  <span className="text-sm font-semibold leading-6 text-muted-foreground">
                    /month
                  </span>
                )}
              </p>
              <motion.ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {tier.features.map((feature) => (
                  <motion.li
                    key={feature}
                    className="flex gap-x-3"
                    variants={listItem}
                  >
                    <Check
                      className="h-6 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant={tier.buttonVariant}
                  className={cn(
                    "mt-8 w-full",
                    tier.featured && "button-gradient",
                  )}
                >
                  {tier.buttonText}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
