"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PaymentStepper } from "@/components/payment-stepper";
import { ReviewDetails } from "@/components/review-details";
import { OtpForm } from "@/components/otp-form";
import { Button } from "@/components/ui/button";
import { payees, account } from "@/lib/data";

function ReviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showOtp, setShowOtp] = useState(false);

  const payeeId = searchParams.get("payee");
  const amount = searchParams.get("amount") || "0";
  const mode = searchParams.get("mode") || "IMPS";

  const payee = payees.find((p) => p.id === payeeId);

  if (!payee) {
    return (
      <div className="mx-auto max-w-[640px] px-8 py-7 text-center">
        <p className="text-slate-500">Payee not found.</p>
        <Link href="/dashboard/payments/send" className="text-primary text-sm">
          Go back
        </Link>
      </div>
    );
  }

  const handleConfirmOtp = () => {
    setShowOtp(true);
  };

  const handleOtpSubmit = () => {
    router.push(
      `/dashboard/payments/send/success?payee=${payeeId}&amount=${amount}&mode=${mode}`
    );
  };

  return (
    <div className="mx-auto max-w-[640px] px-8 py-7">
      {/* Back link */}
      <Link
        href="/dashboard/payments/send"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      {/* Page heading */}
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        Review & Verify
      </h1>

      {/* Stepper */}
      <div className="mb-8">
        <PaymentStepper currentStep={2} />
      </div>

      <AnimatePresence mode="wait">
        {!showOtp ? (
          /* Review state */
          <motion.div
            key="review"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <ReviewDetails
              amount={amount}
              payeeName={payee.name}
              payeeBank={payee.bank}
              payeeAccount={payee.accountLastFour}
              fromAccount={account.lastFour}
              mode={mode}
            />

            <Button
              onClick={handleConfirmOtp}
              className="h-12 w-full rounded-[10px] text-base font-semibold"
            >
              Confirm & Send OTP
            </Button>

            <p className="text-center text-xs text-slate-400">
              OTP will be sent to ****1234
            </p>
          </motion.div>
        ) : (
          /* OTP state */
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            {/* Compact summary bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between rounded-[14px] border border-slate-100 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${payee.color}`}
                >
                  {payee.initials}
                </div>
                <span className="text-sm font-medium text-slate-900">
                  Paying {payee.name}
                </span>
              </div>
              <span className="text-sm font-bold text-slate-900">
                &#8377;{Number(amount).toLocaleString("en-IN")}
              </span>
            </motion.div>

            {/* OTP form inside a white card */}
            <div className="rounded-[14px] border border-slate-100 bg-white p-6">
              <OtpForm
                title="Enter OTP"
                subtitle="We've sent a 6-digit OTP to your registered mobile number"
                buttonText="Verify & Pay"
                helperText="Do not share your OTP with anyone"
                onSubmit={handleOtpSubmit}
                onBack={() => setShowOtp(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[640px] px-8 py-7">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-24 rounded bg-slate-200" />
            <div className="h-8 w-48 rounded bg-slate-200" />
            <div className="h-64 rounded-[14px] bg-slate-100" />
          </div>
        </div>
      }
    >
      <ReviewContent />
    </Suspense>
  );
}
