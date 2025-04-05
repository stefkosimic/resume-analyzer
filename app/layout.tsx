import { Public_Sans } from "next/font/google";
import { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

// components
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
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
  ],
  openGraph: {
    title: "ResumeAnalyzer - AI-Powered Resume Feedback",
    description:
      "Optimize your resume with AI insights and improve your job prospects.",
    url: "https://resumeai.simicdev.com",
    type: "website",
    images: [
      {
        url: "https://resumeai.simicdev.com/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "ResumeAnalyzer preview",
      },
    ],
  },
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
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Toaster />
            </div>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
