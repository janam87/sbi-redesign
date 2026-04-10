"use client";

import { useState } from "react";
import { payees } from "@/lib/data";
import { Search, Plus } from "lucide-react";

interface PayeeSelectorProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PayeeSelector({ selectedId, onSelect }: PayeeSelectorProps) {
  const [search, setSearch] = useState("");

  const selectedPayee = payees.find((p) => p.id === selectedId);

  const filteredPayees = payees.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.accountLastFour.includes(search)
  );

  // Selected state: show compact card
  if (selectedPayee) {
    return (
      <div className="rounded-[14px] border-2 border-primary bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold ${selectedPayee.color}`}
            >
              {selectedPayee.initials}
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                {selectedPayee.name}
              </p>
              <p className="text-sm text-slate-500">
                {selectedPayee.bank} ****{selectedPayee.accountLastFour}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelect("")}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Change
          </button>
        </div>
      </div>
    );
  }

  // Unselected state: show selection UI
  return (
    <div className="space-y-4">
      {/* Recent payee avatars */}
      <div>
        <p className="mb-3 text-sm font-medium text-slate-500">
          Recent Payees
        </p>
        <div className="flex items-center gap-3">
          {payees.map((payee) => (
            <button
              key={payee.id}
              onClick={() => onSelect(payee.id)}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold transition-all ${payee.color} ${
                  selectedId === payee.id
                    ? "border-2 border-primary"
                    : "hover:scale-105"
                }`}
              >
                {payee.initials}
              </div>
              <span className="text-xs text-slate-600">
                {payee.name.split(" ")[0]}
              </span>
            </button>
          ))}
          <button className="flex flex-col items-center gap-1.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-slate-300 text-slate-400 hover:border-primary hover:text-primary transition-colors">
              <Plus className="size-5" />
            </div>
            <span className="text-xs text-slate-600">New</span>
          </button>
        </div>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or account number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full rounded-[10px] border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Payee list */}
      <div className="space-y-2">
        {filteredPayees.map((payee) => (
          <div
            key={payee.id}
            className="flex items-center justify-between rounded-[12px] border border-slate-100 bg-white p-3.5 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${payee.color}`}
              >
                {payee.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {payee.name}
                </p>
                <p className="text-xs text-slate-500">
                  {payee.bank} ****{payee.accountLastFour}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSelect(payee.id)}
              className="rounded-lg bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              Pay
            </button>
          </div>
        ))}
        {filteredPayees.length === 0 && (
          <p className="py-4 text-center text-sm text-slate-400">
            No payees found
          </p>
        )}
      </div>
    </div>
  );
}
