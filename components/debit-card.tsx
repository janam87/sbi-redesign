import { Lock, BarChart3, Hash } from "lucide-react";
import { debitCard } from "@/lib/data";

export function DebitCard() {
  return (
    <div className="grid grid-cols-[280px_1fr] gap-6">
      {/* Card Visual */}
      <div className="relative h-[170px] w-[280px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-primary p-5 text-white">
        {/* Top: SBI + Network */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest opacity-90">
            SBI
          </span>
          <span className="text-sm font-bold tracking-wider opacity-90">
            {debitCard.network}
          </span>
        </div>

        {/* Card Number */}
        <p className="mt-8 text-sm tracking-[0.2em] opacity-80">
          {debitCard.number}
        </p>

        {/* Bottom: Holder + Expiry */}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider opacity-50">
              Card Holder
            </p>
            <p className="text-xs font-medium tracking-wide">
              {debitCard.holder}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider opacity-50">
              Expires
            </p>
            <p className="text-xs font-medium">{debitCard.expiry}</p>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex flex-col gap-2">
        {[
          { icon: Lock, label: "Lock / Unlock Card", desc: "Temporarily freeze your card" },
          { icon: BarChart3, label: "Set Limits", desc: "ATM & POS limits" },
          { icon: Hash, label: "View PIN", desc: "View your card PIN securely" },
        ].map((action) => (
          <button
            key={action.label}
            className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-left transition-colors hover:bg-slate-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
              <action.icon className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {action.label}
              </p>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
