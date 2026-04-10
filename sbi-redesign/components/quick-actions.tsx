import Link from "next/link";
import { ArrowUpRight, ArrowDownLeft, FileText } from "lucide-react";

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Send Money — Primary */}
      <Link
        href="/dashboard/payments/send"
        className="flex items-center gap-4 rounded-[14px] bg-primary p-5 text-white transition-opacity hover:opacity-90"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
          <ArrowUpRight className="size-5" />
        </div>
        <div>
          <p className="font-semibold">Send Money</p>
          <p className="text-sm text-white/70">Transfer to anyone</p>
        </div>
      </Link>

      {/* Self Transfer */}
      <button className="flex items-center gap-4 rounded-[14px] border border-border bg-white p-5 text-left transition-colors hover:bg-slate-50">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
          <ArrowDownLeft className="size-5 text-green-600" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Self Transfer</p>
          <p className="text-sm text-muted-foreground">Between accounts</p>
        </div>
      </button>

      {/* Pay Bills */}
      <button className="flex items-center gap-4 rounded-[14px] border border-border bg-white p-5 text-left transition-colors hover:bg-slate-50">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50">
          <FileText className="size-5 text-yellow-600" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Pay Bills</p>
          <p className="text-sm text-muted-foreground">Utilities & more</p>
        </div>
      </button>
    </div>
  );
}
