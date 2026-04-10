"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { PaymentStepper } from "@/components/payment-stepper";
import { SuccessReceipt } from "@/components/success-receipt";
import { Button } from "@/components/ui/button";
import { payees } from "@/lib/data";
import { Check } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();

  const payeeId = searchParams.get("payee");
  const amount = searchParams.get("amount") || "0";
  const mode = searchParams.get("mode") || "IMPS";

  const payee = payees.find((p) => p.id === payeeId);

  const referenceNumber = useMemo(() => {
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
    return `${mode}/4100${randomDigits}`;
  }, [mode]);

  const dateTime = useMemo(() => {
    const now = new Date();
    return now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }, []);

  if (!payee) {
    return (
      <div className="mx-auto max-w-[640px] px-8 py-7 text-center">
        <p className="text-slate-500">Payment details not found.</p>
        <Link href="/dashboard" className="text-primary text-sm">
          Go Home
        </Link>
      </div>
    );
  }

  const formattedAmount = Number(amount).toLocaleString("en-IN");

  return (
    <div className="mx-auto max-w-[640px] px-8 py-7">
      {/* Stepper — all done */}
      <div className="mb-10">
        <PaymentStepper currentStep={3} />
      </div>

      {/* Animated checkmark */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-green-500 bg-green-50"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              delay: 0.2,
            }}
          >
            <Check className="size-8 text-green-500" strokeWidth={3} />
          </motion.div>
        </motion.div>
      </div>

      {/* Success text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mb-8 text-center"
      >
        <h2 className="text-2xl font-bold text-slate-900">
          Payment Successful!
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          &#8377;{formattedAmount} sent to {payee.name}
        </p>
      </motion.div>

      {/* Receipt */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mb-8"
      >
        <SuccessReceipt
          amount={amount}
          payeeName={payee.name}
          payeeBank={payee.bank}
          payeeAccount={payee.accountLastFour}
          referenceNumber={referenceNumber}
          dateTime={dateTime}
        />
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="space-y-3"
      >
        {/* Download & Share row */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-11 rounded-[10px] text-sm font-medium"
          >
            Download
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-[10px] text-sm font-medium"
          >
            Share
          </Button>
        </div>

        {/* Send Another + Go Home */}
        <Link href="/dashboard/payments/send" className="block">
          <Button className="h-12 w-full rounded-[10px] text-base font-semibold">
            Send Another Payment
          </Button>
        </Link>
        <Link href="/dashboard" className="block">
          <Button
            variant="secondary"
            className="h-12 w-full rounded-[10px] text-base font-semibold"
          >
            Go Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[640px] px-8 py-7">
          <div className="animate-pulse space-y-4">
            <div className="mx-auto h-[72px] w-[72px] rounded-full bg-slate-200" />
            <div className="mx-auto h-8 w-48 rounded bg-slate-200" />
            <div className="h-48 rounded-[14px] bg-slate-100" />
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
