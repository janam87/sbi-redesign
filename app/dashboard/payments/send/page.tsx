"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PaymentStepper } from "@/components/payment-stepper";
import { PayeeSelector } from "@/components/payee-selector";
import { AmountInput } from "@/components/amount-input";
import { Button } from "@/components/ui/button";
import { payees, account, formatCurrency } from "@/lib/data";

export default function SendMoneyPage() {
  const router = useRouter();
  const [selectedPayeeId, setSelectedPayeeId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [transferMode, setTransferMode] = useState<"IMPS" | "NEFT" | "RTGS">(
    "IMPS"
  );

  const selectedPayee = payees.find((p) => p.id === selectedPayeeId);

  const handleReview = () => {
    if (!selectedPayeeId || !amount) return;
    router.push(
      `/dashboard/payments/send/review?payee=${selectedPayeeId}&amount=${amount}&mode=${transferMode}`
    );
  };

  return (
    <div className="mx-auto max-w-[640px] px-8 py-7">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft className="size-4" />
        Home
      </Link>

      {/* Page heading */}
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Send Money</h1>

      {/* Stepper */}
      <div className="mb-8">
        <PaymentStepper currentStep={1} />
      </div>

      {/* Payee selector */}
      <div className="mb-6">
        <PayeeSelector
          selectedId={selectedPayeeId}
          onSelect={(id) => setSelectedPayeeId(id || null)}
        />
      </div>

      {/* Show amount + options when payee is selected */}
      {selectedPayee && (
        <div className="space-y-6">
          {/* Amount input */}
          <AmountInput
            amount={amount}
            onChange={setAmount}
            lastPaidAmount={selectedPayee.lastPaidAmount}
            lastPaidDate={selectedPayee.lastPaidDate}
          />

          {/* Transfer mode + From account row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Transfer via */}
            <div className="rounded-[14px] border border-slate-200 bg-white p-4">
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Transfer via
              </label>
              <select
                value={transferMode}
                onChange={(e) =>
                  setTransferMode(e.target.value as "IMPS" | "NEFT" | "RTGS")
                }
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="IMPS">IMPS</option>
                <option value="NEFT">NEFT</option>
                <option value="RTGS">RTGS</option>
              </select>
            </div>

            {/* From account */}
            <div className="rounded-[14px] border border-slate-200 bg-white p-4">
              <label className="mb-2 block text-xs font-medium text-slate-500">
                From
              </label>
              <p className="text-sm font-medium text-slate-900">
                ****{account.lastFour}
              </p>
              <p className="text-xs text-slate-400">
                Bal: {formatCurrency(account.balance)}
              </p>
            </div>
          </div>

          {/* Review button */}
          <Button
            onClick={handleReview}
            disabled={!amount || Number(amount) === 0}
            className="h-12 w-full rounded-[10px] text-base font-semibold"
          >
            Review Payment
          </Button>
        </div>
      )}
    </div>
  );
}
