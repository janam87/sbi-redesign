import { BarChart3, CreditCard } from "lucide-react";
import { account, formatCurrency } from "@/lib/data";

export function BalanceCard() {
  return (
    <div className="rounded-[14px] border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        {/* Left: Account info + balance */}
        <div>
          <p className="text-sm text-muted-foreground">
            {account.type} &bull; {account.lastFour}
          </p>
          <p className="mt-1 text-[32px] font-bold leading-tight text-foreground">
            {formatCurrency(account.balance)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Available Balance
          </p>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-3">
          <button className="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 px-4 py-3 transition-colors hover:bg-slate-100">
            <BarChart3 className="size-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Statement</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 px-4 py-3 transition-colors hover:bg-slate-100">
            <CreditCard className="size-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Card</span>
          </button>
        </div>
      </div>
    </div>
  );
}
