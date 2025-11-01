"use client";

import { AlertCircleIcon, FileText, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import { resumeFormSchema } from "@/types/schemas/prompt.schema";
import type { ResumeFormData } from "@/types/prompt.type";
import type { ResumeReviewResult } from "@/types/schemas/result.schema";

interface PromptSectionProps {
  onSubmit: (data: ResumeReviewResult) => void;
}

const PromptSection = ({ onSubmit: onSubmitProp }: PromptSectionProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeFormSchema),
  });

  // Handle file selection
  const handleFileChange = (file: File | null) => {
    if (!file) return;

    // Validate file type - Only PDF for now
    if (file.type !== "application/pdf") {
      setError("Only PDF files are accepted");
      setSelectedFile(null);
      return;
    }

    // Validate file size (3MB)
    if (file.size > 3 * 1024 * 1024) {
      setError("File size must be less than 3MB");
      setSelectedFile(null);
      return;
    }

    setError(null);
    setSelectedFile(file);
    setValue("resume", file);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  // Form submit handler
  const handleFormSubmit = async (data: ResumeFormData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("resume", data.resume);
      formData.append("jobDescription", data.jobDescription || "");

      // Call the API
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to analyze resume");
        return;
      }

      const result = await response.json();

      // Call parent's onSubmit handler with the result
      onSubmitProp(result.data);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4 sm:space-y-6"
    >
      {(error || errors.resume) && (
        <Alert
          variant="destructive"
          className="relative border-destructive/50 bg-destructive/10"
        >
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">Error</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            {error || errors.resume?.message}
          </AlertDescription>
          <button
            type="button"
            onClick={() => {
              setError(null);
              setSelectedFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1 rounded-md hover:bg-destructive/20 transition-colors"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </Alert>
      )}

      {/* File Upload Section */}
      <div
        className={`border-2 border-dashed rounded-xl bg-card transition-all duration-300 group ${
          isDragging
            ? "border-cyan-500 bg-cyan-500/5 shadow-lg shadow-cyan-500/20"
            : selectedFile
            ? "border-green-500 bg-green-500/5"
            : "border-border hover:bg-accent/5 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          id="pdf-upload"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileChange(file);
            }
          }}
        />
        <Label
          htmlFor="pdf-upload"
          className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6 cursor-pointer"
        >
          <div
            className={`p-3 sm:p-4 bg-linear-to-br rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 ${
              selectedFile
                ? "from-green-500/10 to-green-600/10"
                : "from-cyan-500/10 to-blue-600/10"
            }`}
          >
            <FileText
              className={`h-10 w-10 sm:h-12 sm:w-12 ${
                selectedFile
                  ? "text-green-600"
                  : "text-cyan-600 group-hover:text-cyan-500"
              }`}
            />
          </div>
          {selectedFile ? (
            <>
              <p className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2 text-center wrap-break-word max-w-full px-2">
                {selectedFile.name}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(2)} KB • Click to change
              </p>
            </>
          ) : (
            <>
              <p className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">
                Click to select PDF file
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                or drag and drop your resume here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports: PDF only (Max 3MB)
              </p>
            </>
          )}
        </Label>
      </div>

      {/* Job Description Section */}
      <div className="space-y-2 sm:space-y-3">
        <Label
          htmlFor="job-description"
          className="text-sm sm:text-base font-semibold"
        >
          Job Description{" "}
          <span className="text-muted-foreground font-normal">(Optional)</span>
        </Label>
        <Textarea
          id="job-description"
          placeholder="Paste the job description here to get tailored feedback..."
          className="min-h-24 sm:min-h-32 resize-none text-sm sm:text-base"
          {...register("jobDescription")}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting || !selectedFile}
        className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-sm sm:text-base py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        {isSubmitting ? "Reviewing..." : "Review My Resume"}
      </Button>
    </form>
  );
};

export default PromptSection;
