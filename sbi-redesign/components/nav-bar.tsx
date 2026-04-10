"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { user } from "@/lib/data";

const navItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Accounts", href: "#" },
  { label: "Payments", href: "/dashboard/payments/send" },
  { label: "Cards", href: "#" },
  { label: "Investments", href: "#" },
  { label: "Services", href: "#" },
];

export function NavBar() {
  const pathname = usePathname();

  function isActive(item: (typeof navItems)[number]) {
    if (item.label === "Home") return pathname === "/dashboard";
    if (item.label === "Payments") return pathname.startsWith("/dashboard/payments");
    return false;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white px-8 py-3">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        {/* Left: Logo + Wordmark */}
        <div className="flex items-center gap-3">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-primary">
            <span className="text-[10px] font-bold tracking-wide text-white">
              SBI
            </span>
          </div>
          <span className="text-sm font-semibold text-slate-800">
            SBI Online
          </span>
        </div>

        {/* Center: Nav Items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                isActive(item)
                  ? "font-semibold text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Bell + Avatar */}
        <div className="flex items-center gap-4">
          <button
            className="relative rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            {user.initials}
          </div>
        </div>
      </div>
    </nav>
  );
}
