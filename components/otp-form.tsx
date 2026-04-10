"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface OtpFormProps {
  title: string;
  subtitle: string;
  buttonText: string;
  helperText: string;
  onSubmit: () => void;
  onBack?: () => void;
}

export function OtpForm({
  title,
  subtitle,
  buttonText,
  helperText,
  onSubmit,
  onBack,
}: OtpFormProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [expirySeconds, setExpirySeconds] = useState(272); // 4:32
  const [resendSeconds, setResendSeconds] = useState(28);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setExpirySeconds((prev) => (prev > 0 ? prev - 1 : 0));
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Only allow digits
      if (value && !/^\d$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-advance on digit entry
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      // Backspace goes to previous box
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = Array(6).fill("");
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  }, []);

  const handleResend = () => {
    setResendSeconds(28);
    setExpirySeconds(272);
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every((d) => d !== "")) {
      onSubmit();
    }
  };

  const isFilled = otp.every((d) => d !== "");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back button + title */}
      <div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-4 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        )}
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      {/* OTP input boxes */}
      <div className="flex justify-between gap-2" onPaste={handlePaste}>
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            autoFocus={i === 0}
            className={`h-14 w-full rounded-[10px] border-2 bg-slate-50 text-center text-xl font-semibold outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              otp[i]
                ? "border-primary"
                : "border-slate-300"
            }`}
          />
        ))}
      </div>

      {/* Timers */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">
          Expires in{" "}
          <span className="font-medium text-slate-700">
            {formatTime(expirySeconds)}
          </span>
        </span>
        {resendSeconds > 0 ? (
          <span className="text-slate-400">
            Resend in {resendSeconds}s
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Resend OTP
          </button>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={!isFilled}
        className="h-12 w-full rounded-[10px] text-base font-semibold"
      >
        {buttonText}
      </Button>

      {/* Helper text */}
      <p className="text-center text-xs text-slate-400">{helperText}</p>
    </form>
  );
}
