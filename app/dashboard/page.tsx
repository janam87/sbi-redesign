"use client";

import { user } from "@/lib/data";
import { BalanceCard } from "@/components/balance-card";
import { QuickActions } from "@/components/quick-actions";
import { TransactionList } from "@/components/transaction-list";
import { MonthlyOverview } from "@/components/monthly-overview";
import { DebitCard } from "@/components/debit-card";
import { SchemesCarousel } from "@/components/schemes-carousel";
import { QuickServices } from "@/components/quick-services";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-8 py-7">
      {/* Greeting Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {getGreeting()}, {user.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s your account overview
        </p>
      </div>

      {/* Dashboard Sections */}
      <div className="flex flex-col gap-6">
        <BalanceCard />
        <QuickActions />
        <TransactionList />
        <MonthlyOverview />
        <DebitCard />
        <SchemesCarousel />
        <QuickServices />
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-border pt-6 pb-8">
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <button className="hover:text-foreground transition-colors">
            About SBI
          </button>
          <span className="text-border">|</span>
          <button className="hover:text-foreground transition-colors">
            Privacy Policy
          </button>
          <span className="text-border">|</span>
          <button className="hover:text-foreground transition-colors">
            Terms & Conditions
          </button>
          <span className="text-border">|</span>
          <button className="hover:text-foreground transition-colors">
            Sitemap
          </button>
        </div>
      </footer>
    </div>
  );
}
