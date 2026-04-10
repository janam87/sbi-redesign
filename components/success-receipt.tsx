interface SuccessReceiptProps {
  amount: string;
  payeeName: string;
  payeeBank: string;
  payeeAccount: string;
  referenceNumber: string;
  dateTime: string;
}

export function SuccessReceipt({
  amount,
  payeeName,
  payeeBank,
  payeeAccount,
  referenceNumber,
  dateTime,
}: SuccessReceiptProps) {
  const formattedAmount = Number(amount).toLocaleString("en-IN");

  return (
    <div className="rounded-[14px] border border-slate-100 bg-white p-5">
      <div className="space-y-0 divide-y divide-slate-100">
        {/* Amount */}
        <div className="flex items-center justify-between py-3 first:pt-0">
          <span className="text-sm text-slate-500">Amount</span>
          <span className="text-sm font-bold text-slate-900">
            &#8377;{formattedAmount}
          </span>
        </div>

        {/* To */}
        <div className="flex items-start justify-between py-3">
          <span className="text-sm text-slate-500">To</span>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{payeeName}</p>
            <p className="text-xs text-slate-400">
              {payeeBank} ****{payeeAccount}
            </p>
          </div>
        </div>

        {/* Reference No */}
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-slate-500">Reference No.</span>
          <span className="font-mono text-sm font-semibold text-slate-900">
            {referenceNumber}
          </span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center justify-between py-3 last:pb-0">
          <span className="text-sm text-slate-500">Date & Time</span>
          <span className="text-sm text-slate-900">{dateTime}</span>
        </div>
      </div>
    </div>
  );
}
