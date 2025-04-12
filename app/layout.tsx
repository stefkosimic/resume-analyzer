import { Public_Sans } from "next/font/google";
import { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

// components
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { ResumeProvider } from "@/contexts/resume-context";
import "./globals.css";

const publicSans = Public_Sans({ subsets: ["latin"] });

export const generateMetadata = (): Metadata => ({
  title: "ResumeAnalyzer - AI-Powered Resume Feedback",
  description:
    "Get instant feedback, optimize your resume, and boost your chances of landing your dream job.",
  keywords: [
    "resume feedback",
    "AI resume analyzer",
    "resume optimization",
    "job application tips",
    "career advice",
    "resume builder",
    "resume review",
    "AI career tools",
  ],
  authors: [{ name: "ResumeAnalyzer" }],
  creator: "ResumeAnalyzer",
  publisher: "ResumeAnalyzer",
  robots: "index, follow",
  openGraph: {
    title: "ResumeAnalyzer - AI-Powered Resume Feedback",
    description:
      "Optimize your resume with AI insights and improve your job prospects.",
    url: "https://resumeai.simicdev.com",
    type: "website",
    siteName: "ResumeAnalyzer",
    locale: "en_US",
    images: [
      {
        url: "https://resumeai.simicdev.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ResumeAnalyzer preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeAnalyzer - AI-Powered Resume Feedback",
    description:
      "Optimize your resume with AI insights and improve your job prospects.",
    images: ["https://resumeai.simicdev.com/twitter-image.png"],
    creator: "@resumeanalyzer",
    site: "@resumeanalyzer",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  category: "Technology",
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
            defaultTheme="dark"
            themes={["light", "dark"]}
            attribute="class"
            enableSystem={true}
          >
            <ResumeProvider>
              <div className="relative min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Toaster />
              </div>
            </ResumeProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
