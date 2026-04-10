import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { transactions, formatCurrency } from "@/lib/data";

export function TransactionList() {
  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="rounded-[14px] border border-border bg-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Recent Transactions</h3>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View all
        </button>
      </div>

      {/* Transaction List */}
      <div className="mt-4 space-y-1">
        {recentTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-xl px-2 py-3 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  tx.type === "sent"
                    ? "bg-red-50"
                    : "bg-green-50"
                }`}
              >
                {tx.type === "sent" ? (
                  <ArrowUpRight className="size-5 text-red-500" />
                ) : (
                  <ArrowDownLeft className="size-5 text-green-500" />
                )}
              </div>
              {/* Name + meta */}
              <div>
                <p className="text-sm font-medium text-foreground">{tx.name}</p>
                <p className="text-xs text-muted-foreground">
                  {tx.date} &bull; {tx.mode}
                </p>
              </div>
            </div>

            {/* Amount */}
            <p
              className={`text-sm font-semibold ${
                tx.amount < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {tx.amount < 0 ? "- " : "+ "}
              {formatCurrency(tx.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
