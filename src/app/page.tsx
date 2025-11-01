"use client";

import PromptSection from "@/components/PrompSection";
import ResultSection from "@/components/ResultSection";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import type { ResumeReviewResult } from "@/types/schemas/result.schema";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [resultData, setResultData] = useState<ResumeReviewResult | null>(null);

  const handleFormSubmit = (data: ResumeReviewResult) => {
    // Set the result data and show results
    setResultData(data);
    setShowResults(true);
  };

  const handleBackToForm = () => {
    // Reset state and go back to form
    setShowResults(false);
    setResultData(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 overflow-x-hidden w-full">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="p-1.5 sm:p-2 bg-linear-to-br from-cyan-500 to-blue-600 rounded-lg shrink-0">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <h1 className="font-mono text-lg sm:text-xl md:text-2xl font-bold truncate">
              ShinyResume
            </h1>
          </div>
          <Badge
            variant="destructive"
            className="uppercase font-semibold px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm shrink-0"
          >
            Demo
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        {!showResults ? (
          <div className="w-full max-w-2xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Review Your Resume
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
                Get professional feedback on your resume powered by AI
              </p>
            </div>

            {/* Upload Section */}
            <PromptSection
              key={showResults ? "hidden" : "visible"}
              onSubmit={handleFormSubmit}
            />

            {/* Features */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
              <div className="p-3 sm:p-4 rounded-lg bg-card border border-border">
                <p className="text-xl sm:text-2xl font-bold text-cyan-600 mb-1">
                  AI-Powered
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Advanced analysis
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-card border border-border">
                <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
                  Instant
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Fast feedback
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-card border border-border">
                <p className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">
                  Detailed
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Comprehensive review
                </p>
              </div>
            </div>
          </div>
        ) : (
          <ResultSection data={resultData} onBack={handleBackToForm} />
        )}
      </main>
    </div>
  );
}
