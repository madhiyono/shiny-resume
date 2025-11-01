import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Award,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Target,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  ArrowLeft,
} from "lucide-react";
import type { ResumeReviewResult } from "@/types/schemas/result.schema";

interface ResultSectionProps {
  data: ResumeReviewResult | null;
  onBack: () => void;
}

const ResultSection = ({ data, onBack }: ResultSectionProps) => {
  if (!data) {
    return null;
  }

  return (
    <section className="w-full pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={onBack}
          className="gap-2 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </Button>

        {/* Header with Overall Score */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div>
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl">
              Review Results
            </h2>
          </div>

          {/* Overall Score Card */}
          <Card className="max-w-md mx-auto bg-linear-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/20">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 sm:border-8 border-cyan-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-4xl sm:text-5xl font-bold text-cyan-600">
                        {data.overallScore}
                      </p>
                      <p className="text-sm text-muted-foreground">/100</p>
                    </div>
                  </div>
                  <Award className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-8 w-8 sm:h-10 sm:w-10 text-cyan-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    Overall Score
                  </h3>
                  <Badge
                    variant="default"
                    className="bg-cyan-600 hover:bg-cyan-700 text-xs sm:text-sm"
                  >
                    Excellent Resume
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Summary */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <CardTitle className="text-base sm:text-lg">
                Overall Summary
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              General assessment of your resume quality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              {data.summary}
            </p>
          </CardContent>
        </Card>

        {/* Identified Skills */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <CardTitle className="text-base sm:text-lg">
                Identified Skills
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Skills found in your resume and suggested additions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-green-600 flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                Skills Present
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {data.identifiedSkills.present.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="default"
                    className="bg-green-600 hover:bg-green-700 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-orange-600 flex items-center gap-2">
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
                Suggested Skills to Add
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {data.identifiedSkills.missing.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-orange-600 text-orange-600 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
              <CardTitle className="text-base sm:text-lg">Education</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Educational background assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium">
                Section Score:
              </span>
              <Badge
                variant="default"
                className="bg-indigo-600 hover:bg-indigo-700 text-xs"
              >
                {data.education.score}/100
              </Badge>
            </div>
            <p className="text-sm sm:text-base text-foreground/90">
              {data.education.summary}
            </p>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <CardTitle className="text-base sm:text-lg">Experience</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Work experience evaluation and scores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="p-3 sm:p-4 rounded-lg border bg-muted/50 space-y-2 overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base truncate">
                      {exp.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      {exp.company}
                    </p>
                  </div>
                  <Badge
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700 text-xs shrink-0"
                  >
                    {exp.score}/100
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-foreground/80 wrap-break-word">
                  {exp.feedback}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Grid Layout for Strengths and Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
          {/* Key Strengths */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <CardTitle className="text-base sm:text-lg">
                  Key Strengths
                </CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm">
                What your resume does well
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 sm:space-y-3">
                {data.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-foreground/90">
                      {strength}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                <CardTitle className="text-base sm:text-lg">
                  Areas for Improvement
                </CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm">
                Suggestions to enhance your resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 sm:space-y-3">
                {data.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-foreground/90">
                      {improvement}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Specific Recommendations */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600" />
              <CardTitle className="text-base sm:text-lg">
                Specific Recommendations
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Actionable advice to improve your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 sm:space-y-3">
              {data.recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20"
                >
                  <span className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground/90">
                    {recommendation}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* What You Need to Fix */}
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
              <CardTitle className="text-destructive text-base sm:text-lg">
                What You Need to Fix
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Critical issues that should be addressed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 sm:space-y-3">
              {data.fixes.map((fix, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 p-2 sm:p-3 rounded-lg bg-background border"
                >
                  <span className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-destructive text-white flex items-center justify-center text-xs font-bold">
                    !
                  </span>
                  <span className="text-xs sm:text-sm text-foreground/90">
                    {fix}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Job Fit */}
        <Card className="bg-linear-to-br from-purple-500/10 to-pink-600/10 border-purple-500/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <CardTitle className="text-base sm:text-lg">
                Fit with the Job
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              How well your resume matches the job description
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-medium">
                    Match Score
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-purple-600">
                    {data.jobFit}%
                  </span>
                </div>
                <div className="h-3 sm:h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-purple-600 to-pink-600 transition-all duration-500"
                    style={{ width: `${data.jobFit}%` }}
                  />
                </div>
              </div>
              <Badge
                variant="default"
                className="bg-purple-600 hover:bg-purple-700 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 whitespace-nowrap"
              >
                Strong Match
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ResultSection;
