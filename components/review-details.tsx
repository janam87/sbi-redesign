interface ReviewDetailsProps {
  amount: string;
  payeeName: string;
  payeeBank: string;
  payeeAccount: string;
  fromAccount: string;
  mode: string;
}

export function ReviewDetails({
  amount,
  payeeName,
  payeeBank,
  payeeAccount,
  fromAccount,
  mode,
}: ReviewDetailsProps) {
  const formattedAmount = Number(amount).toLocaleString("en-IN");

  return (
    <div className="space-y-5">
      {/* Amount heading */}
      <div className="text-center">
        <p className="text-sm text-slate-500">You&apos;re sending</p>
        <p className="mt-1 text-4xl font-bold text-slate-900">
          &#8377;{formattedAmount}
        </p>
      </div>

      {/* Details card */}
      <div className="rounded-[14px] border border-slate-100 bg-white p-5">
        <div className="space-y-0 divide-y divide-slate-100">
          {/* To */}
          <div className="flex items-start justify-between py-3 first:pt-0">
            <span className="text-sm text-slate-500">To</span>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{payeeName}</p>
              <p className="text-xs text-slate-400">
                {payeeBank} ****{payeeAccount}
              </p>
            </div>
          </div>

          {/* From */}
          <div className="flex items-start justify-between py-3">
            <span className="text-sm text-slate-500">From</span>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">
                State Bank of India
              </p>
              <p className="text-xs text-slate-400">****{fromAccount}</p>
            </div>
          </div>

          {/* Mode */}
          <div className="flex items-center justify-between py-3 last:pb-0">
            <span className="text-sm text-slate-500">Transfer Mode</span>
            <span className="text-sm font-medium text-slate-900">{mode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
