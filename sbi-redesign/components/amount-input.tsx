"use client";

interface AmountInputProps {
  amount: string;
  onChange: (amount: string) => void;
  lastPaidAmount?: number;
  lastPaidDate?: string;
}

function formatDisplay(value: string): string {
  if (!value) return "";
  return Number(value).toLocaleString("en-IN");
}

export function AmountInput({
  amount,
  onChange,
  lastPaidAmount,
  lastPaidDate,
}: AmountInputProps) {
  const quickAmounts = [500, 1000, 5000];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip non-numeric characters
    const raw = e.target.value.replace(/[^0-9]/g, "");
    onChange(raw);
  };

  const handleQuickAmount = (value: number) => {
    onChange(String(value));
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-700">Amount</label>

      {/* Amount input card */}
      <div className="rounded-[14px] border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-center">
          <span className="text-[38px] font-bold text-slate-300 mr-1">
            &#8377;
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={amount ? formatDisplay(amount) : ""}
            onChange={handleInputChange}
            placeholder="0"
            className="w-full text-center text-[38px] font-bold text-slate-900 outline-none placeholder:text-slate-300"
          />
        </div>
      </div>

      {/* Quick amount chips */}
      <div className="flex flex-wrap gap-2">
        {quickAmounts.map((value) => (
          <button
            key={value}
            onClick={() => handleQuickAmount(value)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              amount === String(value)
                ? "border-primary bg-blue-50 text-primary"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            &#8377;{value.toLocaleString("en-IN")}
          </button>
        ))}
        {lastPaidAmount && (
          <button
            onClick={() => handleQuickAmount(lastPaidAmount)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              amount === String(lastPaidAmount)
                ? "border-primary bg-blue-50 text-primary"
                : "border-primary/30 bg-blue-50 text-primary hover:bg-blue-100"
            }`}
          >
            &#8377;{lastPaidAmount.toLocaleString("en-IN")}
          </button>
        )}
      </div>

      {/* Last paid helper text */}
      {lastPaidAmount && lastPaidDate && (
        <p className="text-xs text-slate-400">
          Last paid &#8377;{lastPaidAmount.toLocaleString("en-IN")} on{" "}
          {lastPaidDate}
        </p>
      )}
    </div>
  );
}
