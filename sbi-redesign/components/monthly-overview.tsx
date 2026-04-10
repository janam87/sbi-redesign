import { upcomingPayments, formatCurrency } from "@/lib/data";

export function MonthlyOverview() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* This Month */}
      <div className="rounded-[14px] border border-border bg-white p-6">
        <h3 className="font-semibold text-foreground">This Month</h3>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Money Out</span>
            <span className="text-sm font-semibold text-red-600">
              {formatCurrency(42300)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Money In</span>
            <span className="text-sm font-semibold text-green-600">
              {formatCurrency(85000)}
            </span>
          </div>
        </div>

        {/* Bar visualization */}
        <div className="mt-4 flex h-3 overflow-hidden rounded-full">
          <div
            className="bg-green-500 rounded-l-full"
            style={{ flex: 85 }}
          />
          <div
            className="bg-red-500 rounded-r-full"
            style={{ flex: 42 }}
          />
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span>Expenses</span>
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <div className="rounded-[14px] border border-border bg-white p-6">
        <h3 className="font-semibold text-foreground">Upcoming</h3>

        <div className="mt-4 space-y-3">
          {upcomingPayments.map((payment) => (
            <div
              key={payment.name}
              className={`flex items-center justify-between rounded-xl px-3 py-3 ${
                payment.urgent ? "bg-yellow-50" : "bg-slate-50"
              }`}
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {payment.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Due: {payment.due}
                </p>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {formatCurrency(payment.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
