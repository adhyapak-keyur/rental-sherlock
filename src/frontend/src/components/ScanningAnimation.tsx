import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Brain, CheckCircle2, FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";

interface ScanningAnimationProps {
  onComplete: () => void;
}

const STEPS = [
  { id: "upload", label: "Uploading", icon: Upload, threshold: 0 },
  { id: "analyze", label: "Analyzing", icon: Brain, threshold: 35 },
  { id: "report", label: "Generating Report", icon: FileText, threshold: 75 },
];

const DURATION_MS = 4500;
const INTERVAL_MS = 50;

export function ScanningAnimation({ onComplete }: ScanningAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let current = 0;
    const increment = 100 / (DURATION_MS / INTERVAL_MS);

    const interval = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setCompleted(true);
        clearInterval(interval);

        // Brief pause at 100% before transitioning
        setTimeout(() => {
          onComplete();
        }, 800);
      } else {
        setProgress(Math.round(current));
      }
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [onComplete]);

  const currentStepIndex = STEPS.findLastIndex(
    (step) => progress >= step.threshold,
  );

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[480px] py-12 animate-fade-in-slide"
      data-ocid="scanning.loading_state"
    >
      {/* Animated document scanner visual */}
      <div className="relative w-48 h-56 mb-10">
        {/* Document */}
        <div className="absolute inset-0 bg-card border-2 border-border rounded-xl shadow-card overflow-hidden">
          {/* Document lines */}
          <div className="p-5 space-y-2.5 opacity-30">
            <div className="h-2 bg-navy rounded-full w-3/4" />
            <div className="h-1.5 bg-border rounded-full w-full" />
            <div className="h-1.5 bg-border rounded-full w-5/6" />
            <div className="h-1.5 bg-border rounded-full w-4/5" />
            <div className="h-1.5 bg-border rounded-full w-full" />
            <div className="h-1.5 bg-border rounded-full w-3/4" />
            <div className="mt-3 h-2 bg-navy rounded-full w-1/2" />
            <div className="h-1.5 bg-border rounded-full w-full" />
            <div className="h-1.5 bg-border rounded-full w-5/6" />
            <div className="h-1.5 bg-destructive/40 rounded-full w-4/5" />
            <div className="h-1.5 bg-border rounded-full w-full" />
          </div>

          {/* Scan line */}
          {!completed && (
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sage to-transparent opacity-80"
              style={{
                top: `${progress % 100}%`,
                transition: "top 0.05s linear",
              }}
            />
          )}

          {/* Overlay glow when completed */}
          {completed && (
            <div className="absolute inset-0 bg-sage/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-sage animate-fade-in-slide" />
            </div>
          )}
        </div>

        {/* Magnifying glass icon */}
        <div
          className={cn(
            "absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-navy shadow-navy flex items-center justify-center transition-transform duration-300",
            completed ? "scale-110" : "animate-pulse-glow",
          )}
        >
          {completed ? (
            <CheckCircle2 className="w-6 h-6 text-sage" />
          ) : (
            <div className="flex gap-0.5">
              <span className="dot-bounce-1 w-1.5 h-1.5 rounded-full bg-sage" />
              <span className="dot-bounce-2 w-1.5 h-1.5 rounded-full bg-sage" />
              <span className="dot-bounce-3 w-1.5 h-1.5 rounded-full bg-sage" />
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h2 className="font-display text-2xl font-bold text-navy mb-1">
        {completed ? "Analysis Complete!" : "Scanning in Progress"}
      </h2>
      <p className="text-muted-foreground text-sm mb-8">
        {completed
          ? "Your lease has been fully analyzed."
          : "Our AI is reviewing every clause in your lease..."}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-md space-y-2 mb-8">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Scanning lease document</span>
          <span className="font-medium text-navy">{progress}%</span>
        </div>
        <Progress
          value={progress}
          className="h-2"
          data-ocid="scanning.loading_state"
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2 sm:gap-4">
        {STEPS.map((step, index) => {
          const isComplete =
            progress >= step.threshold &&
            (index < STEPS.length - 1
              ? progress >= STEPS[index + 1].threshold
              : completed);
          const isActive = currentStepIndex === index && !completed;
          const isPast = index < currentStepIndex;

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex flex-col items-center gap-1.5 transition-all duration-500",
                  isActive && "scale-105",
                )}
                data-ocid={`scanning.step.${index + 1}`}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500",
                    isComplete || isPast
                      ? "bg-sage text-white"
                      : isActive
                        ? "bg-navy text-white ring-2 ring-navy/30 ring-offset-2"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {isComplete || isPast ? (
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium whitespace-nowrap transition-colors duration-300 hidden sm:block",
                    isActive
                      ? "text-navy"
                      : isPast || isComplete
                        ? "text-sage"
                        : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div className="flex items-center mx-2 sm:mx-3">
                  <div
                    className={cn(
                      "h-0.5 w-8 sm:w-12 transition-all duration-700",
                      index < currentStepIndex ? "bg-sage" : "bg-border",
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
