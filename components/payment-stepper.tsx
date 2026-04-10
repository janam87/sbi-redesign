"use client";

import { Check } from "lucide-react";

interface PaymentStepperProps {
  currentStep: 1 | 2 | 3;
}

const steps = ["Pay", "Review & Verify", "Done"];

export function PaymentStepper({ currentStep }: PaymentStepperProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        // For step 3 (Done), when currentStep is 3 it should also show as completed
        const isDone = currentStep === 3 && stepNumber === 3;

        return (
          <div key={label} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  isCompleted || isDone
                    ? "bg-green-500 text-white"
                    : isCurrent
                      ? "bg-primary text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {isCompleted || isDone ? (
                  <Check className="size-3.5" strokeWidth={3} />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`text-xs font-medium ${
                  isCompleted || isDone
                    ? "text-green-600"
                    : isCurrent
                      ? "text-primary"
                      : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connecting line (not after last step) */}
            {index < steps.length - 1 && (
              <div
                className={`mx-3 h-0.5 w-16 ${
                  isCompleted ? "bg-green-500" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
