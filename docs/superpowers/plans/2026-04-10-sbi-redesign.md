# SBI Web App Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a functional Next.js prototype of a redesigned SBI banking web app — login (with inline OTP), dashboard, and 3-step payment flow — using shadcn/ui + Aceternity UI.

**Architecture:** Next.js App Router with file-based routing. Each page is a route segment. Shared layout wraps all post-login pages with the nav bar. State management is local React state (no global store needed for a prototype). Dummy data lives in a single constants file. Framer Motion handles all page transitions and inline morphing animations.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Aceternity UI (copy-paste via registry), Framer Motion (`motion` package)

**Spec:** `docs/superpowers/specs/2026-04-10-sbi-redesign-design.md`

---

## File Structure

```
sbi-redesign/
├── app/
│   ├── layout.tsx                    # Root layout (font, metadata)
│   ├── page.tsx                      # Login page (/)
│   ├── globals.css                   # Tailwind + custom theme
│   ├── dashboard/
│   │   ├── layout.tsx                # Post-login layout (nav bar)
│   │   ├── page.tsx                  # Dashboard home (/dashboard)
│   │   └── payments/
│   │       └── send/
│   │           ├── page.tsx          # Step 1: Pay (/dashboard/payments/send)
│   │           ├── review/
│   │           │   └── page.tsx      # Step 2: Review & Verify
│   │           └── success/
│   │               └── page.tsx      # Step 3: Done
├── components/
│   ├── ui/                           # shadcn/ui components (auto-generated)
│   ├── login-form.tsx                # Login form card (username/password state)
│   ├── otp-form.tsx                  # OTP input card (reused in login + payment)
│   ├── nav-bar.tsx                   # Top navigation bar
│   ├── balance-card.tsx              # Account balance display
│   ├── transaction-list.tsx          # Recent transactions list
│   ├── quick-actions.tsx             # Send Money / Self Transfer / Pay Bills row
│   ├── monthly-overview.tsx          # This Month + Upcoming cards
│   ├── debit-card.tsx                # Card visual + actions
│   ├── schemes-carousel.tsx          # Government schemes horizontal scroll
│   ├── quick-services.tsx            # 8-item services grid
│   ├── payment-stepper.tsx           # 3-step progress indicator
│   ├── payee-selector.tsx            # Payee avatars + list + search
│   ├── amount-input.tsx              # Big centered amount + quick chips
│   ├── review-details.tsx            # Receipt-style review card
│   └── success-receipt.tsx           # Success checkmark + receipt
├── lib/
│   ├── data.ts                       # All dummy data (user, accounts, payees, transactions)
│   └── utils.ts                      # cn() helper (shadcn default)
├── public/
│   └── (empty — no images needed)
├── components.json                   # shadcn/ui config
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `sbi-redesign/` (entire project scaffold)
- Create: `sbi-redesign/lib/data.ts`
- Create: `sbi-redesign/lib/utils.ts`
- Modify: `sbi-redesign/app/globals.css`
- Modify: `sbi-redesign/app/layout.tsx`

- [ ] **Step 1: Create Next.js project**

```bash
cd /Users/janam/Documents/claude/SBI
npx create-next-app@latest sbi-redesign --typescript --tailwind --eslint --app --src=false --import-alias "@/*" --turbopack --use-npm
```

Expected: Project created at `sbi-redesign/` with App Router, TypeScript, Tailwind CSS.

- [ ] **Step 2: Initialize shadcn/ui**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
npx shadcn@latest init -d
```

Expected: `components.json` created, `lib/utils.ts` generated with `cn()` helper.

- [ ] **Step 3: Install Aceternity UI dependencies + Framer Motion**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
npm i motion clsx tailwind-merge
```

- [ ] **Step 4: Install shadcn/ui components we'll need**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
npx shadcn@latest add button input label card separator
```

- [ ] **Step 5: Update globals.css with SBI theme colors**

Replace the content of `sbi-redesign/app/globals.css` with:

```css
@import "tailwindcss";

@plugin "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: #f8fafc;
  --color-foreground: #0f172a;
  --color-card: #ffffff;
  --color-card-foreground: #0f172a;
  --color-primary: #0052cc;
  --color-primary-foreground: #ffffff;
  --color-secondary: #f1f5f9;
  --color-secondary-foreground: #0f172a;
  --color-muted: #f1f5f9;
  --color-muted-foreground: #64748b;
  --color-accent: #00d4aa;
  --color-accent-foreground: #0f172a;
  --color-destructive: #dc2626;
  --color-destructive-foreground: #ffffff;
  --color-success: #16a34a;
  --color-success-foreground: #ffffff;
  --color-border: #e2e8f0;
  --color-input: #e2e8f0;
  --color-ring: #0052cc;
  --radius: 0.75rem;

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
}
```

- [ ] **Step 6: Update root layout with Inter font**

Replace `sbi-redesign/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SBI Online Banking",
  description: "State Bank of India — Redesigned",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Create dummy data file**

Create `sbi-redesign/lib/data.ts`:

```ts
export const user = {
  name: "Janam",
  fullName: "Janam Shah",
  initials: "JS",
};

export const account = {
  type: "Savings Account",
  number: "XXXXXXXX8033",
  lastFour: "8033",
  balance: 135991.21,
  interestRate: 2.5,
  bank: "SBI",
};

export const debitCard = {
  number: "XXXX XXXX XXXX 4957",
  lastFour: "4957",
  holder: "JANAM SHAH",
  validFrom: "05/21",
  expiry: "04/26",
  network: "VISA",
};

export const payees = [
  {
    id: "1",
    name: "Janam Shah",
    initials: "JS",
    bank: "Kotak Mahindra",
    accountLastFour: "5871",
    color: "bg-blue-100 text-blue-700",
    lastPaidAmount: 34000,
    lastPaidDate: "30 Mar",
  },
  {
    id: "2",
    name: "Manali Bhavsar",
    initials: "MB",
    bank: "SBI",
    accountLastFour: "5325",
    color: "bg-pink-100 text-pink-700",
    lastPaidAmount: 5200,
    lastPaidDate: "25 Mar",
  },
  {
    id: "3",
    name: "Rahul Sharma",
    initials: "RS",
    bank: "HDFC",
    accountLastFour: "9012",
    color: "bg-green-100 text-green-700",
    lastPaidAmount: 2000,
    lastPaidDate: "15 Mar",
  },
];

export const transactions = [
  {
    id: "1",
    name: "Janam Shah",
    date: "30 Mar",
    mode: "IMPS",
    amount: -34000,
    type: "sent" as const,
  },
  {
    id: "2",
    name: "Salary Credit",
    date: "28 Mar",
    mode: "NEFT",
    amount: 85000,
    type: "received" as const,
  },
  {
    id: "3",
    name: "Manali Bhavsar",
    date: "25 Mar",
    mode: "IMPS",
    amount: -5200,
    type: "sent" as const,
  },
];

export const schemes = [
  {
    id: "1",
    icon: "🎓",
    title: "Education Loan",
    description: "Study anywhere in India or abroad. Starting at 8.15% p.a.",
    bgColor: "bg-blue-50",
  },
  {
    id: "2",
    icon: "🏪",
    title: "MSME Easy Loan",
    description: "Grow your small business. Collateral-free up to ₹1 Cr.",
    bgColor: "bg-green-50",
  },
  {
    id: "3",
    icon: "🏠",
    title: "PM Awas Yojana",
    description: "Home loan subsidy up to ₹2.67 lakh for eligible families.",
    bgColor: "bg-yellow-50",
  },
  {
    id: "4",
    icon: "🚜",
    title: "Kisan Credit Card",
    description: "Crop loans at 4% p.a. with interest subvention for farmers.",
    bgColor: "bg-pink-50",
  },
  {
    id: "5",
    icon: "🚀",
    title: "Startup India Loan",
    description: "Fund your startup dream. Special rates for DPIIT registered startups.",
    bgColor: "bg-blue-50",
  },
];

export const upcomingPayments = [
  { name: "Electricity Bill", due: "15 Apr", amount: 2450, urgent: true },
  { name: "Credit Card", due: "20 Apr", amount: 12800, urgent: false },
];

export const quickServices = [
  { icon: "📜", label: "Statements" },
  { icon: "📝", label: "Cheque Book" },
  { icon: "🏧", label: "ATM Locator" },
  { icon: "📋", label: "Tax Payment" },
  { icon: "🏦", label: "Fixed Deposit" },
  { icon: "📈", label: "Investments" },
  { icon: "🛡️", label: "Insurance" },
  { icon: "📞", label: "Help & Support" },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
}
```

- [ ] **Step 8: Verify dev server starts**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
npm run dev
```

Expected: Dev server starts at `http://localhost:3000` with no errors.

- [ ] **Step 9: Commit**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
git add -A
git commit -m "feat: scaffold project with Next.js, shadcn/ui, Aceternity deps, SBI theme, and dummy data"
```

---

## Task 2: Login Page — Sign In State

**Files:**
- Create: `sbi-redesign/components/login-form.tsx`
- Modify: `sbi-redesign/app/page.tsx`

- [ ] **Step 1: Build the login form component**

Create `sbi-redesign/components/login-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  onSubmit: () => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Sign in to your account
        </h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-slate-700">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-12 rounded-[10px] bg-slate-50 border-slate-300 text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-[10px] bg-slate-50 border-slate-300 text-sm pr-14"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-primary"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="text-right">
        <button type="button" className="text-sm font-medium text-primary">
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        className="w-full h-12 rounded-[10px] bg-primary hover:bg-primary/90 text-white font-semibold text-[15px]"
      >
        Sign In
      </Button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <p className="text-center text-sm text-slate-500">
        New to SBI?{" "}
        <button type="button" className="font-semibold text-primary">
          Create account
        </button>
      </p>
    </form>
  );
}
```

- [ ] **Step 2: Build the login page**

Replace `sbi-redesign/app/page.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { OtpForm } from "@/components/otp-form";
import { AnimatePresence, motion } from "motion/react";

export default function LoginPage() {
  const [showOtp, setShowOtp] = useState(false);
  const router = useRouter();

  function handleLoginSubmit() {
    setShowOtp(true);
  }

  function handleOtpSubmit() {
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col">
      {/* Nav */}
      <header className="flex items-center justify-between px-12 py-4 bg-white border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-[38px] h-[38px] bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">SBI</span>
          </div>
          <span className="text-foreground text-[17px] font-semibold">
            State Bank of India
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-muted-foreground text-sm cursor-pointer">Help</span>
          <span className="text-muted-foreground text-sm cursor-pointer">हिन्दी</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-10">
        <div className="flex gap-20 items-center max-w-[900px] w-full">
          {/* Left — Brand */}
          <div className="flex-1">
            <h1 className="text-[32px] font-bold leading-[1.3] tracking-tight text-foreground mb-3">
              Welcome to
              <br />
              SBI Online Banking
            </h1>
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-8 max-w-[380px]">
              Safe, simple, and secure. Access your account from anywhere.
            </p>

            <div className="flex flex-col gap-3.5">
              {[
                { icon: "🔒", text: "Your money is safe with us" },
                { icon: "⚡", text: "Send money in seconds" },
                { icon: "📱", text: "Works on any device" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-base">
                    {item.icon}
                  </div>
                  <span className="text-slate-600 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="flex-1 max-w-[380px]">
            <div className="bg-white border border-border rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <AnimatePresence mode="wait">
                {!showOtp ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LoginForm onSubmit={handleLoginSubmit} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OtpForm
                      title="Verify it's you"
                      subtitle="We sent a code to ****1234"
                      buttonText="Verify & Sign In"
                      helperText="Didn't get the code? Check your SMS"
                      onSubmit={handleOtpSubmit}
                      onBack={() => setShowOtp(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-3.5">
              <span className="text-xs">🛡️</span>
              <span className="text-xs text-muted-foreground">
                Protected by RBI guidelines
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-border bg-white">
        <span className="text-xs text-muted-foreground">
          © 2026 State Bank of India. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
```

- [ ] **Step 3: Verify login page renders**

Run `npm run dev`, open `http://localhost:3000`. The login page should render with the split layout: brand story on left, login form card on right. It will have a build error because `OtpForm` doesn't exist yet — that's expected, we'll build it next.

- [ ] **Step 4: Commit**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
git add components/login-form.tsx app/page.tsx
git commit -m "feat: add login page with sign-in form and split layout"
```

---

## Task 3: OTP Component (Reusable)

**Files:**
- Create: `sbi-redesign/components/otp-form.tsx`

- [ ] **Step 1: Build the OTP form component**

This component is reused in both login and payment flows. Create `sbi-redesign/components/otp-form.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface OtpFormProps {
  title: string;
  subtitle: string;
  buttonText: string;
  helperText: string;
  onSubmit: () => void;
  onBack?: () => void;
}

export function OtpForm({
  title,
  subtitle,
  buttonText,
  helperText,
  onSubmit,
  onBack,
}: OtpFormProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(272); // 4:32
  const [resendTimer, setResendTimer] = useState(28);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground text-lg mb-1"
        >
          <span>←</span>
        </button>
      )}

      <div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 block mb-2">
          Enter OTP
        </label>
        <div className="flex gap-2.5">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`flex-1 h-14 text-center text-xl font-semibold rounded-[10px] border-[1.5px] bg-slate-50 outline-none transition-colors ${
                digit
                  ? "border-primary text-foreground"
                  : "border-slate-300 text-muted-foreground"
              } focus:border-primary focus:ring-2 focus:ring-primary/20`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Expires in{" "}
          <strong className="text-slate-700">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </strong>
        </span>
        {resendTimer > 0 ? (
          <span className="text-xs text-muted-foreground">
            Resend in {resendTimer}s
          </span>
        ) : (
          <button
            type="button"
            className="text-xs font-medium text-primary"
            onClick={() => setResendTimer(28)}
          >
            Resend OTP
          </button>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 rounded-[10px] bg-primary hover:bg-primary/90 text-white font-semibold text-[15px]"
      >
        {buttonText}
      </Button>

      <p className="text-center text-xs text-muted-foreground">{helperText}</p>
    </form>
  );
}
```

- [ ] **Step 2: Verify login → OTP flow works**

Run `npm run dev`, open `http://localhost:3000`. Type anything in username/password, click "Sign In." The form card should animate/morph to the OTP input. Back arrow should return to login. Entering 6 digits + clicking "Verify & Sign In" should navigate to `/dashboard` (which will 404 — that's expected).

- [ ] **Step 3: Commit**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
git add components/otp-form.tsx
git commit -m "feat: add reusable OTP form component with auto-focus, countdown timers"
```

---

## Task 4: Dashboard Layout (Nav Bar)

**Files:**
- Create: `sbi-redesign/components/nav-bar.tsx`
- Create: `sbi-redesign/app/dashboard/layout.tsx`

- [ ] **Step 1: Build the nav bar component**

Create `sbi-redesign/components/nav-bar.tsx`:

```tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
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

  function isActive(href: string) {
    if (href === "#") return false;
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-white border-b border-border">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">SBI</span>
          </div>
          <span className="text-foreground text-base font-semibold">
            SBI Online
          </span>
        </Link>

        <nav className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors ${
                isActive(item.href)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-5 h-5 rounded-full border-[1.5px] border-slate-300 flex items-center justify-center text-[10px] text-muted-foreground cursor-pointer">
          🔔
        </div>
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-primary font-semibold text-xs">
            {user.initials}
          </span>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create dashboard layout**

Create `sbi-redesign/app/dashboard/layout.tsx`:

```tsx
import { NavBar } from "@/components/nav-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create placeholder dashboard page**

Create `sbi-redesign/app/dashboard/page.tsx`:

```tsx
export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard placeholder</h1>
    </div>
  );
}
```

- [ ] **Step 4: Verify nav bar renders**

Run dev server, navigate to `http://localhost:3000/dashboard`. Nav bar should appear with SBI logo, 6 nav items, notification bell, and user avatar. "Home" should be highlighted blue.

- [ ] **Step 5: Commit**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
git add components/nav-bar.tsx app/dashboard/layout.tsx app/dashboard/page.tsx
git commit -m "feat: add dashboard layout with sticky nav bar"
```

---

## Task 5: Dashboard Page — All Sections

**Files:**
- Create: `sbi-redesign/components/balance-card.tsx`
- Create: `sbi-redesign/components/quick-actions.tsx`
- Create: `sbi-redesign/components/transaction-list.tsx`
- Create: `sbi-redesign/components/monthly-overview.tsx`
- Create: `sbi-redesign/components/debit-card.tsx`
- Create: `sbi-redesign/components/schemes-carousel.tsx`
- Create: `sbi-redesign/components/quick-services.tsx`
- Modify: `sbi-redesign/app/dashboard/page.tsx`

- [ ] **Step 1: Build balance card**

Create `sbi-redesign/components/balance-card.tsx`:

```tsx
import { account, formatCurrency } from "@/lib/data";

export function BalanceCard() {
  return (
    <div className="bg-white border border-border rounded-[14px] p-6 flex justify-between items-center">
      <div>
        <p className="text-muted-foreground text-[13px]">
          {account.type} • ****{account.lastFour}
        </p>
        <p className="text-foreground text-[32px] font-bold tracking-tight mt-1">
          {formatCurrency(account.balance)}
        </p>
        <p className="text-muted-foreground text-[13px] mt-1">
          Available Balance
        </p>
      </div>
      <div className="flex gap-2.5">
        {[
          { icon: "📊", label: "Statement" },
          { icon: "💳", label: "Card" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-slate-50 border border-border rounded-[10px] px-4 py-2.5 text-center cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <span className="text-lg block">{item.icon}</span>
            <span className="text-slate-600 text-[11px]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build quick actions**

Create `sbi-redesign/components/quick-actions.tsx`:

```tsx
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="flex gap-3">
      <Link
        href="/dashboard/payments/send"
        className="flex-1 bg-primary rounded-xl p-[18px] flex items-center gap-3 hover:bg-primary/90 transition-colors"
      >
        <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center text-lg">
          ↗
        </div>
        <div>
          <span className="text-white font-semibold text-sm block">
            Send Money
          </span>
          <span className="text-white/60 text-xs">To anyone, instantly</span>
        </div>
      </Link>

      {[
        { icon: "↙", label: "Self Transfer", sub: "Between your accounts", bg: "bg-green-50" },
        { icon: "📄", label: "Pay Bills", sub: "Electricity, phone, etc.", bg: "bg-yellow-50" },
      ].map((item) => (
        <div
          key={item.label}
          className="flex-1 bg-white border border-border rounded-xl p-[18px] flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center text-lg`}>
            {item.icon}
          </div>
          <div>
            <span className="text-foreground font-semibold text-sm block">
              {item.label}
            </span>
            <span className="text-muted-foreground text-xs">{item.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Build transaction list**

Create `sbi-redesign/components/transaction-list.tsx`:

```tsx
import { transactions, formatCurrency } from "@/lib/data";

export function TransactionList() {
  return (
    <div className="bg-white border border-border rounded-[14px] p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-foreground text-base font-semibold">
          Recent Transactions
        </h3>
        <span className="text-primary text-[13px] font-medium cursor-pointer">
          View all
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between items-center py-3.5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm ${
                  tx.type === "sent"
                    ? "bg-red-50 text-red-500"
                    : "bg-green-50 text-green-500"
                }`}
              >
                {tx.type === "sent" ? "↗" : "↙"}
              </div>
              <div>
                <span className="text-foreground text-sm font-medium block">
                  {tx.name}
                </span>
                <span className="text-muted-foreground text-xs">
                  {tx.date} • {tx.mode}
                </span>
              </div>
            </div>
            <span
              className={`font-semibold text-sm ${
                tx.amount < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {tx.amount < 0 ? "- " : "+ "}
              {formatCurrency(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Build monthly overview + upcoming**

Create `sbi-redesign/components/monthly-overview.tsx`:

```tsx
import { upcomingPayments, formatCurrency } from "@/lib/data";

export function MonthlyOverview() {
  return (
    <div className="flex gap-4">
      {/* This Month */}
      <div className="flex-1 bg-white border border-border rounded-[14px] p-5">
        <h3 className="text-foreground text-base font-semibold mb-4">
          This Month
        </h3>
        <div className="flex gap-6 items-end">
          <div>
            <p className="text-muted-foreground text-xs">Money Out</p>
            <p className="text-red-600 text-[22px] font-bold mt-1">₹42,300</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Money In</p>
            <p className="text-green-600 text-[22px] font-bold mt-1">
              ₹85,000
            </p>
          </div>
        </div>
        <div className="flex gap-1 h-2 rounded mt-4 overflow-hidden">
          <div className="bg-green-500 rounded" style={{ flex: 85 }} />
          <div className="bg-red-500 rounded" style={{ flex: 42 }} />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-muted-foreground text-[11px]">Income</span>
          <span className="text-muted-foreground text-[11px]">Expenses</span>
        </div>
      </div>

      {/* Upcoming */}
      <div className="flex-1 bg-white border border-border rounded-[14px] p-5">
        <h3 className="text-foreground text-base font-semibold mb-4">
          Upcoming
        </h3>
        <div className="flex flex-col gap-3">
          {upcomingPayments.map((payment) => (
            <div
              key={payment.name}
              className={`flex justify-between items-center p-2.5 rounded-[10px] ${
                payment.urgent ? "bg-yellow-50" : "bg-slate-50"
              }`}
            >
              <div>
                <span className="text-foreground text-[13px] font-medium block">
                  {payment.name}
                </span>
                <span className="text-muted-foreground text-[11px]">
                  Due {payment.due}
                </span>
              </div>
              <span className="text-foreground font-semibold text-[13px]">
                {formatCurrency(payment.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Build debit card component**

Create `sbi-redesign/components/debit-card.tsx`:

```tsx
import { debitCard } from "@/lib/data";

export function DebitCardSection() {
  return (
    <div className="bg-white border border-border rounded-[14px] p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-foreground text-base font-semibold">Your Card</h3>
        <span className="text-primary text-[13px] font-medium cursor-pointer">
          Manage
        </span>
      </div>
      <div className="flex gap-5 items-center">
        {/* Card visual */}
        <div className="w-[280px] h-[170px] bg-gradient-to-br from-slate-800 to-primary rounded-[14px] p-[22px] flex flex-col justify-between shrink-0">
          <div className="flex justify-between items-center">
            <span className="text-white font-black text-sm">SBI</span>
            <span className="text-white/70 text-xs font-semibold">
              {debitCard.network}
            </span>
          </div>
          <div>
            <p className="text-white/60 text-xs tracking-[2px] mb-2.5">
              {debitCard.number}
            </p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/50 text-[9px]">CARD HOLDER</p>
                <p className="text-white text-[13px] font-medium mt-0.5">
                  {debitCard.holder}
                </p>
              </div>
              <div>
                <p className="text-white/50 text-[9px]">EXPIRES</p>
                <p className="text-white text-[13px] font-medium mt-0.5">
                  {debitCard.expiry}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card actions */}
        <div className="flex flex-col gap-2.5 flex-1">
          {[
            { icon: "🔒", title: "Lock/Unlock Card", sub: "Temporarily freeze your card" },
            { icon: "📊", title: "Set Limits", sub: "ATM, POS, online limits" },
            { icon: "🔢", title: "View PIN", sub: "Generate or reset ATM PIN" },
          ].map((action) => (
            <div
              key={action.title}
              className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-[10px] cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <span className="text-base">{action.icon}</span>
              <div>
                <span className="text-foreground text-[13px] font-medium block">
                  {action.title}
                </span>
                <span className="text-muted-foreground text-[11px]">
                  {action.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Build schemes carousel**

Create `sbi-redesign/components/schemes-carousel.tsx`:

```tsx
import { schemes } from "@/lib/data";

export function SchemesCarousel() {
  return (
    <div>
      <div className="flex justify-between items-center mb-3.5">
        <h3 className="text-foreground text-base font-semibold">
          Schemes & Benefits for You
        </h3>
        <span className="text-primary text-[13px] font-medium cursor-pointer">
          View all
        </span>
      </div>
      <div className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-hide">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="min-w-[240px] bg-white border border-border rounded-[14px] p-5 shrink-0 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div
              className={`w-9 h-9 ${scheme.bgColor} rounded-lg flex items-center justify-center text-lg mb-3`}
            >
              {scheme.icon}
            </div>
            <h4 className="text-foreground text-sm font-semibold mb-1">
              {scheme.title}
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed mb-2">
              {scheme.description}
            </p>
            <span className="text-primary text-xs font-medium">
              Learn more →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Build quick services grid**

Create `sbi-redesign/components/quick-services.tsx`:

```tsx
import { quickServices } from "@/lib/data";

export function QuickServices() {
  return (
    <div className="bg-white border border-border rounded-[14px] p-5">
      <h3 className="text-foreground text-base font-semibold mb-4">
        Quick Services
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {quickServices.map((service) => (
          <div
            key={service.label}
            className="text-center py-4 px-2 bg-slate-50 rounded-[10px] cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <span className="text-[22px] block mb-1.5">{service.icon}</span>
            <span className="text-slate-600 text-xs">{service.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Assemble the dashboard page**

Replace `sbi-redesign/app/dashboard/page.tsx` with:

```tsx
import { user } from "@/lib/data";
import { BalanceCard } from "@/components/balance-card";
import { QuickActions } from "@/components/quick-actions";
import { TransactionList } from "@/components/transaction-list";
import { MonthlyOverview } from "@/components/monthly-overview";
import { DebitCardSection } from "@/components/debit-card";
import { SchemesCarousel } from "@/components/schemes-carousel";
import { QuickServices } from "@/components/quick-services";

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="px-8 py-7 max-w-[1200px] mx-auto">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {greeting}, {user.name}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here&apos;s your account overview
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <BalanceCard />
        <QuickActions />
        <TransactionList />
        <MonthlyOverview />
        <DebitCardSection />
        <SchemesCarousel />
        <QuickServices />
      </div>

      {/* Footer */}
      <footer className="text-center py-5 mt-6 border-t border-border">
        <div className="flex justify-center gap-6 mb-2.5">
          {["About SBI", "Privacy Policy", "Terms & Conditions", "Sitemap"].map(
            (link) => (
              <span
                key={link}
                className="text-muted-foreground text-xs cursor-pointer"
              >
                {link}
              </span>
            )
          )}
        </div>
        <span className="text-muted-foreground text-[11px]">
          © 2026 State Bank of India. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
```

- [ ] **Step 9: Verify full dashboard renders**

Run dev server, log in (or go directly to `/dashboard`). All 7 sections should render: greeting, balance, quick actions, transactions, monthly overview, debit card, schemes carousel, quick services, footer.

- [ ] **Step 10: Commit**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
git add components/balance-card.tsx components/quick-actions.tsx components/transaction-list.tsx components/monthly-overview.tsx components/debit-card.tsx components/schemes-carousel.tsx components/quick-services.tsx app/dashboard/page.tsx
git commit -m "feat: add complete dashboard with all 7 sections"
```

---

## Task 6: Payment Step 1 — Pay Page

**Files:**
- Create: `sbi-redesign/components/payment-stepper.tsx`
- Create: `sbi-redesign/components/payee-selector.tsx`
- Create: `sbi-redesign/components/amount-input.tsx`
- Create: `sbi-redesign/app/dashboard/payments/send/page.tsx`

- [ ] **Step 1: Build payment stepper**

Create `sbi-redesign/components/payment-stepper.tsx`:

```tsx
interface PaymentStepperProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, label: "Pay" },
  { number: 2, label: "Review & Verify" },
  { number: 3, label: "Done" },
];

export function PaymentStepper({ currentStep }: PaymentStepperProps) {
  return (
    <div className="flex items-center mb-7">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center flex-1 last:flex-none">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                step.number < currentStep
                  ? "bg-green-500 text-white"
                  : step.number === currentStep
                  ? "bg-primary text-white"
                  : "bg-slate-200 text-muted-foreground"
              }`}
            >
              {step.number < currentStep ? "✓" : step.number}
            </div>
            <span
              className={`text-[13px] ${
                step.number < currentStep
                  ? "text-green-500 font-semibold"
                  : step.number === currentStep
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 ${
                step.number < currentStep ? "bg-green-500" : "bg-slate-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Build payee selector**

Create `sbi-redesign/components/payee-selector.tsx`:

```tsx
"use client";

import { useState } from "react";
import { payees } from "@/lib/data";

interface PayeeSelectorProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PayeeSelector({ selectedId, onSelect }: PayeeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const selected = payees.find((p) => p.id === selectedId);

  const filteredPayees = payees.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.accountLastFour.includes(searchQuery)
  );

  return (
    <div>
      <label className="text-sm font-semibold text-slate-700 block mb-2.5">
        To
      </label>

      {/* Recent avatars */}
      <div className="flex gap-4 mb-4">
        {payees.map((payee) => (
          <button
            key={payee.id}
            onClick={() => onSelect(payee.id)}
            className="text-center"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1.5 border-2 transition-colors ${
                payee.id === selectedId
                  ? "border-primary"
                  : "border-transparent"
              } ${payee.color}`}
            >
              <span className="font-semibold text-sm">{payee.initials}</span>
            </div>
            <span
              className={`text-[11px] ${
                payee.id === selectedId
                  ? "text-primary font-medium"
                  : "text-slate-600"
              }`}
            >
              {payee.name.split(" ")[0]}
              {payee.name.split(" ")[1]?.[0]
                ? ` ${payee.name.split(" ")[1][0]}.`
                : ""}
            </span>
          </button>
        ))}
        <button className="text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1.5 border-2 border-transparent bg-slate-100">
            <span className="text-muted-foreground text-lg">+</span>
          </div>
          <span className="text-slate-600 text-[11px]">New</span>
        </button>
      </div>

      {/* Selected payee card */}
      {selected && (
        <div className="bg-white border-[1.5px] border-primary rounded-xl p-3.5 flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${selected.color}`}
            >
              <span className="font-semibold text-xs">
                {selected.initials}
              </span>
            </div>
            <div>
              <span className="text-foreground text-sm font-medium block">
                {selected.name}
              </span>
              <span className="text-muted-foreground text-xs">
                {selected.bank} • ****{selected.accountLastFour}
              </span>
            </div>
          </div>
          <button
            onClick={() => onSelect("")}
            className="text-primary text-[13px] font-medium"
          >
            Change
          </button>
        </div>
      )}

      {/* Search + full list (when no payee selected) */}
      {!selected && (
        <>
          <input
            type="text"
            placeholder="Search by name or account number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 bg-white border border-border rounded-xl px-4 text-sm placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 mb-4"
          />
          <div className="flex flex-col gap-2">
            {filteredPayees.map((payee) => (
              <div
                key={payee.id}
                className="bg-white border border-border rounded-xl p-3.5 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${payee.color}`}
                  >
                    <span className="font-semibold text-xs">
                      {payee.initials}
                    </span>
                  </div>
                  <div>
                    <span className="text-foreground text-sm font-medium block">
                      {payee.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {payee.bank} • ****{payee.accountLastFour}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onSelect(payee.id)}
                  className="bg-primary text-white rounded-lg px-5 py-2 text-[13px] font-medium"
                >
                  Pay
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Build amount input**

Create `sbi-redesign/components/amount-input.tsx`:

```tsx
"use client";

import { formatCurrency } from "@/lib/data";

interface AmountInputProps {
  amount: string;
  onChange: (amount: string) => void;
  lastPaidAmount?: number;
  lastPaidDate?: string;
}

const quickAmounts = [500, 1000, 5000];

export function AmountInput({
  amount,
  onChange,
  lastPaidAmount,
  lastPaidDate,
}: AmountInputProps) {
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^0-9]/g, "");
    onChange(value);
  }

  const displayAmount = amount
    ? Number(amount).toLocaleString("en-IN")
    : "0";

  return (
    <div>
      <label className="text-sm font-semibold text-slate-700 block mb-2.5">
        Amount
      </label>
      <div className="bg-white border border-border rounded-[14px] p-6 text-center">
        <div className="flex items-center justify-center gap-1">
          <span className="text-foreground text-[38px] font-light">₹</span>
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={handleInput}
            placeholder="0"
            className="text-foreground text-[38px] font-bold bg-transparent outline-none text-center w-48 placeholder:text-slate-300"
          />
        </div>

        <div className="flex gap-2 justify-center mt-3.5">
          {quickAmounts.map((qa) => (
            <button
              key={qa}
              onClick={() => onChange(String(qa))}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-colors ${
                amount === String(qa)
                  ? "bg-blue-50 border border-blue-200 text-primary font-semibold"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              ₹{qa.toLocaleString("en-IN")}
            </button>
          ))}
          {lastPaidAmount && (
            <button
              onClick={() => onChange(String(lastPaidAmount))}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-colors ${
                amount === String(lastPaidAmount)
                  ? "bg-blue-50 border border-blue-200 text-primary font-semibold"
                  : "bg-blue-50 border border-blue-200 text-primary font-semibold"
              }`}
            >
              {formatCurrency(lastPaidAmount)}
            </button>
          )}
        </div>

        {lastPaidAmount && lastPaidDate && (
          <p className="text-muted-foreground text-[11px] mt-2">
            Last paid {formatCurrency(lastPaidAmount)} on {lastPaidDate}
          </p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Build the Pay page**

Create `sbi-redesign/app/dashboard/payments/send/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PaymentStepper } from "@/components/payment-stepper";
import { PayeeSelector } from "@/components/payee-selector";
import { AmountInput } from "@/components/amount-input";
import { account, payees } from "@/lib/data";

export default function SendMoneyPage() {
  const router = useRouter();
  const [selectedPayeeId, setSelectedPayeeId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [transferMode, setTransferMode] = useState<"IMPS" | "NEFT" | "RTGS">("IMPS");

  const selectedPayee = payees.find((p) => p.id === selectedPayeeId);

  function handleReview() {
    if (!selectedPayeeId || !amount) return;
    const params = new URLSearchParams({
      payee: selectedPayeeId,
      amount,
      mode: transferMode,
    });
    router.push(`/dashboard/payments/send/review?${params}`);
  }

  return (
    <div className="px-8 py-7 max-w-[640px] mx-auto">
      <Link
        href="/dashboard"
        className="text-primary text-[13px] mb-1 inline-block"
      >
        ← Home
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-6">Send Money</h1>

      <PaymentStepper currentStep={1} />

      <div className="space-y-6">
        <PayeeSelector
          selectedId={selectedPayeeId}
          onSelect={(id) => setSelectedPayeeId(id || null)}
        />

        {selectedPayeeId && (
          <>
            <AmountInput
              amount={amount}
              onChange={setAmount}
              lastPaidAmount={selectedPayee?.lastPaidAmount}
              lastPaidDate={selectedPayee?.lastPaidDate}
            />

            {/* Transfer mode + From account */}
            <div className="flex gap-3">
              <div className="flex-1 bg-white border border-border rounded-xl p-3.5">
                <p className="text-muted-foreground text-[11px] mb-1">
                  Transfer via
                </p>
                <select
                  value={transferMode}
                  onChange={(e) =>
                    setTransferMode(e.target.value as "IMPS" | "NEFT" | "RTGS")
                  }
                  className="text-foreground text-sm font-semibold bg-transparent outline-none w-full"
                >
                  <option value="IMPS">IMPS • Instant</option>
                  <option value="NEFT">NEFT • 30 min</option>
                  <option value="RTGS">RTGS • Instant, ₹2L+</option>
                </select>
              </div>
              <div className="flex-1 bg-white border border-border rounded-xl p-3.5">
                <p className="text-muted-foreground text-[11px] mb-1">From</p>
                <p className="text-foreground text-sm font-semibold">
                  ****{account.lastFour}
                  <span className="text-muted-foreground font-normal text-[11px] ml-1.5">
                    • {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(account.balance)}
                  </span>
                </p>
              </div>
            </div>

            <Button
              onClick={handleReview}
              disabled={!amount || Number(amount) === 0}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-[15px]"
            >
              Review Payment
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify pay page**

Navigate to `/dashboard/payments/send`. Select a payee, enter an amount, choose transfer mode. "Review Payment" button should be enabled. Clicking it should navigate to `/dashboard/payments/send/review?payee=1&amount=34000&mode=IMPS` (which will 404 — expected).

- [ ] **Step 6: Commit**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
git add components/payment-stepper.tsx components/payee-selector.tsx components/amount-input.tsx app/dashboard/payments/send/page.tsx
git commit -m "feat: add payment step 1 — payee selection, amount input, transfer mode"
```

---

## Task 7: Payment Step 2 — Review & Verify

**Files:**
- Create: `sbi-redesign/components/review-details.tsx`
- Create: `sbi-redesign/app/dashboard/payments/send/review/page.tsx`

- [ ] **Step 1: Build review details component**

Create `sbi-redesign/components/review-details.tsx`:

```tsx
import { formatCurrency } from "@/lib/data";

interface ReviewDetailsProps {
  amount: number;
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
  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-muted-foreground text-[13px]">You&apos;re sending</p>
        <p className="text-foreground text-4xl font-bold tracking-tight mt-1">
          {formatCurrency(amount)}
        </p>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        {[
          {
            label: "To",
            value: payeeName,
            sub: `${payeeBank} • ****${payeeAccount}`,
          },
          { label: "From", value: `SBI • ****${fromAccount}` },
          { label: "Mode", value: `${mode} (Instant)` },
        ].map((row, i, arr) => (
          <div
            key={row.label}
            className={`px-5 py-4 flex justify-between items-center ${
              i < arr.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <span className="text-muted-foreground text-[13px]">
              {row.label}
            </span>
            <div className="text-right">
              <span className="text-foreground text-[13px] font-medium block">
                {row.value}
              </span>
              {row.sub && (
                <span className="text-muted-foreground text-[11px]">
                  {row.sub}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build the Review & Verify page**

Create `sbi-redesign/app/dashboard/payments/send/review/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PaymentStepper } from "@/components/payment-stepper";
import { ReviewDetails } from "@/components/review-details";
import { OtpForm } from "@/components/otp-form";
import { payees, account, formatCurrency } from "@/lib/data";
import { AnimatePresence, motion } from "motion/react";

export default function ReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showOtp, setShowOtp] = useState(false);

  const payeeId = searchParams.get("payee");
  const amount = Number(searchParams.get("amount") || 0);
  const mode = searchParams.get("mode") || "IMPS";
  const payee = payees.find((p) => p.id === payeeId);

  if (!payee || !amount) {
    router.push("/dashboard/payments/send");
    return null;
  }

  function handleConfirm() {
    setShowOtp(true);
  }

  function handleOtpSubmit() {
    const params = new URLSearchParams({
      payee: payeeId!,
      amount: String(amount),
      mode,
    });
    router.push(`/dashboard/payments/send/success?${params}`);
  }

  return (
    <div className="px-8 py-7 max-w-[640px] mx-auto">
      <Link
        href={`/dashboard/payments/send`}
        className="text-primary text-[13px] mb-1 inline-block"
      >
        ← Back
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Review & Verify
      </h1>

      <PaymentStepper currentStep={2} />

      <AnimatePresence mode="wait">
        {!showOtp ? (
          <motion.div
            key="review"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ReviewDetails
              amount={amount}
              payeeName={payee.name}
              payeeBank={payee.bank}
              payeeAccount={payee.accountLastFour}
              fromAccount={account.lastFour}
              mode={mode}
            />

            <Button
              onClick={handleConfirm}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-[15px] mt-6"
            >
              Confirm & Send OTP
            </Button>
            <p className="text-muted-foreground text-[11px] text-center mt-2">
              OTP will be sent to ****1234
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Compact summary */}
            <div className="bg-white border border-border rounded-xl p-3.5 flex justify-between items-center mb-6">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${payee.color}`}
                >
                  <span className="font-semibold text-xs">
                    {payee.initials}
                  </span>
                </div>
                <div>
                  <span className="text-foreground text-[13px] font-medium block">
                    Paying {payee.name}
                  </span>
                  <span className="text-muted-foreground text-[11px]">
                    {mode} • {payee.bank}
                  </span>
                </div>
              </div>
              <span className="text-foreground text-lg font-bold">
                {formatCurrency(amount)}
              </span>
            </div>

            {/* OTP form */}
            <div className="bg-white border border-border rounded-[14px] p-6">
              <OtpForm
                title="Enter OTP"
                subtitle="Sent to ****1234"
                buttonText={`Pay ${formatCurrency(amount)}`}
                helperText=""
                onSubmit={handleOtpSubmit}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 3: Verify review page**

From the Pay page, select a payee, enter ₹34,000, click "Review Payment." The review page should show amount, details, and "Confirm & Send OTP." Click confirm — details collapse, OTP morphs in with "Pay ₹34,000" button.

- [ ] **Step 4: Commit**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
git add components/review-details.tsx app/dashboard/payments/send/review/page.tsx
git commit -m "feat: add payment step 2 — review details with inline OTP morph"
```

---

## Task 8: Payment Step 3 — Success Page

**Files:**
- Create: `sbi-redesign/components/success-receipt.tsx`
- Create: `sbi-redesign/app/dashboard/payments/send/success/page.tsx`

- [ ] **Step 1: Build success receipt component**

Create `sbi-redesign/components/success-receipt.tsx`:

```tsx
import { formatCurrency } from "@/lib/data";

interface SuccessReceiptProps {
  amount: number;
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
  const rows = [
    { label: "Amount", value: formatCurrency(amount), bold: true },
    {
      label: "To",
      value: `${payeeName} • ${payeeBank} ****${payeeAccount}`,
    },
    { label: "Reference No.", value: referenceNumber, mono: true },
    { label: "Date & Time", value: dateTime },
  ];

  return (
    <div className="bg-white border border-border rounded-[14px] overflow-hidden">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`px-5 py-4 flex justify-between items-center ${
            i < rows.length - 1 ? "border-b border-slate-100" : ""
          }`}
        >
          <span className="text-muted-foreground text-[13px]">{row.label}</span>
          <span
            className={`text-sm ${
              row.bold
                ? "text-foreground font-semibold text-[15px]"
                : row.mono
                ? "text-foreground font-semibold font-mono"
                : "text-foreground font-medium"
            }`}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Build the success page**

Create `sbi-redesign/app/dashboard/payments/send/success/page.tsx`:

```tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PaymentStepper } from "@/components/payment-stepper";
import { SuccessReceipt } from "@/components/success-receipt";
import { payees, formatCurrency } from "@/lib/data";
import { motion } from "motion/react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const payeeId = searchParams.get("payee");
  const amount = Number(searchParams.get("amount") || 0);
  const mode = searchParams.get("mode") || "IMPS";
  const payee = payees.find((p) => p.id === payeeId);

  const now = new Date();
  const dateTime = `${now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}, ${now.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;

  const referenceNumber = `${mode}/4100${Math.floor(
    10000000 + Math.random() * 90000000
  )}`;

  return (
    <div className="px-8 py-7 max-w-[640px] mx-auto text-center">
      <PaymentStepper currentStep={3} />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="w-[72px] h-[72px] bg-green-50 border-[3px] border-green-500 rounded-full flex items-center justify-center mx-auto mb-5"
      >
        <span className="text-green-500 text-4xl">✓</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-[28px] font-bold text-foreground mb-1">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground text-[15px] mb-8">
          {formatCurrency(amount)} sent to {payee?.name || "payee"}
        </p>

        <SuccessReceipt
          amount={amount}
          payeeName={payee?.name || ""}
          payeeBank={payee?.bank || ""}
          payeeAccount={payee?.accountLastFour || ""}
          referenceNumber={referenceNumber}
          dateTime={dateTime}
        />

        <div className="flex gap-3 mt-7">
          <button className="flex-1 bg-white border border-border rounded-xl py-3.5 text-center text-primary font-semibold text-sm">
            📄 Download
          </button>
          <button className="flex-1 bg-white border border-border rounded-xl py-3.5 text-center text-primary font-semibold text-sm">
            📤 Share
          </button>
        </div>

        <div className="flex gap-3 mt-3">
          <Link
            href="/dashboard/payments/send"
            className="flex-1 bg-primary rounded-xl py-3.5 text-center text-white font-semibold text-sm"
          >
            Send Another Payment
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 bg-slate-50 border border-border rounded-xl py-3.5 text-center text-slate-600 font-semibold text-sm"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 3: Verify full payment flow end-to-end**

Start from `/dashboard`. Click "Send Money" → select payee → enter amount → "Review Payment" → see review → "Confirm & Send OTP" → enter any 6 digits → "Pay" → success page with animated checkmark, receipt, download/share/send another/go home buttons.

- [ ] **Step 4: Commit**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
git add components/success-receipt.tsx app/dashboard/payments/send/success/page.tsx
git commit -m "feat: add payment step 3 — success page with animated receipt"
```

---

## Task 9: Polish & Aceternity Effects

**Files:**
- Modify: `sbi-redesign/app/page.tsx` (add Aceternity spotlight)
- Modify: `sbi-redesign/app/globals.css` (scrollbar hide utility)

- [ ] **Step 1: Install Aceternity spotlight component**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
npx shadcn@latest add https://ui.aceternity.com/registry/spotlight.json
```

If the registry URL doesn't work, we'll manually create the spotlight effect. Either way, proceed to step 2.

- [ ] **Step 2: Add spotlight effect to login page**

In `sbi-redesign/app/page.tsx`, add a subtle radial gradient glow to the background. After the opening `<main>` tag, add:

```tsx
{/* Subtle background glows */}
<div className="pointer-events-none fixed inset-0 overflow-hidden">
  <div className="absolute -top-40 right-[20%] w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-3xl" />
  <div className="absolute -bottom-40 left-[10%] w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl" />
</div>
```

This gives the Aceternity-style ambient glow without needing a complex component.

- [ ] **Step 3: Add scrollbar-hide utility**

Add to the end of `sbi-redesign/app/globals.css`:

```css
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

- [ ] **Step 4: Verify polish**

Login page should have subtle blue/teal ambient glows in the background. Schemes carousel should scroll without visible scrollbar.

- [ ] **Step 5: Commit**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
git add app/page.tsx app/globals.css
git commit -m "feat: add ambient glow effects and scrollbar-hide utility"
```

---

## Task 10: Final Verification

- [ ] **Step 1: Full flow test**

Run `npm run dev` and test the complete flow:

1. `http://localhost:3000` — Login page loads, split layout, form visible
2. Enter any username/password → click "Sign In" → card morphs to OTP
3. Enter any 6 digits → click "Verify & Sign In" → redirects to dashboard
4. Dashboard loads with all 7 sections (balance, quick actions, transactions, monthly overview, debit card, schemes, quick services)
5. Click "Send Money" → payment Step 1 loads with stepper
6. Select a payee → amount + transfer mode appear
7. Enter amount → click "Review Payment" → Step 2 loads
8. Review details → click "Confirm & Send OTP" → review collapses, OTP morphs in
9. Enter 6 digits → click "Pay" → Step 3 success page with animated checkmark
10. "Send Another Payment" returns to Step 1, "Go Home" returns to dashboard

- [ ] **Step 2: Build check**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Fix any issues found**

Address any TypeScript errors, missing imports, or layout issues found during testing.

- [ ] **Step 4: Final commit**

```bash
cd /Users/janam/Documents/claude/SBI/sbi-redesign
git add -A
git commit -m "chore: fix any issues found during final verification"
```

---

## Summary

| Task | What it builds | Commits |
|------|---------------|---------|
| 1 | Project scaffold, theme, dummy data | 1 |
| 2 | Login page (sign-in state) | 1 |
| 3 | OTP component (reusable) | 1 |
| 4 | Dashboard layout + nav bar | 1 |
| 5 | Dashboard — all 7 sections | 1 |
| 6 | Payment Step 1 — Pay | 1 |
| 7 | Payment Step 2 — Review & Verify | 1 |
| 8 | Payment Step 3 — Success | 1 |
| 9 | Polish + Aceternity effects | 1 |
| 10 | Final verification | 1 |

**Total: 10 tasks, ~10 commits, 5 routes, 15+ components**
