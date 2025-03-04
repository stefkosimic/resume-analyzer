import Image from "next/image";
import { Public_Sans } from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next/app";

// components
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";
import { Metadata } from "next";

const publicSans = Public_Sans({ subsets: ["latin"] });

export const generateMetadata = (): Metadata => ({
  title: "ResumeAnalyzer",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="ResumeAI" />
      </head>
      <body className={publicSans.className}>
        <NuqsAdapter>
          <ThemeProvider
            defaultTheme="light"
            themes={["light", "dark"]}
            attribute="class"
            enableSystem={false}
          >
            {children}
            <div className="fixed bottom-4 right-4">
              <ThemeToggle />
            </div>
            <Toaster />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
