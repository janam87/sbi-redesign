"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { LoginForm } from "@/components/login-form";
import { OtpForm } from "@/components/otp-form";

type PageState = "login" | "otp";

export default function Home() {
  const [pageState, setPageState] = useState<PageState>("login");
  const router = useRouter();

  const handleLoginSubmit = () => {
    setPageState("otp");
  };

  const handleOtpSubmit = () => {
    router.push("/dashboard");
  };

  const handleOtpBack = () => {
    setPageState("login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-3 sm:px-10">
        <div className="flex items-center gap-3">
          {/* SBI Logo */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-xs font-bold text-white tracking-wide">
              SBI
            </span>
          </div>
          <span className="text-sm font-semibold text-slate-800 sm:text-base">
            State Bank of India
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button className="text-slate-500 hover:text-slate-700 transition-colors">
            Help
          </button>
          <button className="text-slate-500 hover:text-slate-700 transition-colors">
            हिन्दी
          </button>
        </div>
      </header>

      {/* Subtle background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[20%] w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-[10%] w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-10">
        <div className="flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          {/* Left side — Brand messaging */}
          <div className="flex max-w-md flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welcome to{" "}
              <span className="text-primary">SBI Online Banking</span>
            </h1>
            <p className="mt-3 text-lg text-slate-500">
              Safe, simple, and secure.
            </p>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-col gap-4">
              {[
                {
                  emoji: "\uD83D\uDD12",
                  text: "Your money is safe with us",
                },
                {
                  emoji: "\u26A1",
                  text: "Send money in seconds",
                },
                {
                  emoji: "\uD83D\uDCF1",
                  text: "Works on any device",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 text-slate-600"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                    {item.emoji}
                  </span>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side — Login / OTP card */}
          <div className="w-full max-w-sm">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
              <AnimatePresence mode="wait">
                {pageState === "login" ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-slate-900">
                        Sign in to your account
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Enter your credentials to continue
                      </p>
                    </div>
                    <LoginForm onSubmit={handleLoginSubmit} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <OtpForm
                      title="Verify it's you"
                      subtitle="We sent a code to ****1234"
                      buttonText="Verify & Sign In"
                      helperText="Didn't get the code? Check your SMS"
                      onSubmit={handleOtpSubmit}
                      onBack={handleOtpBack}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-6 py-4 text-center text-xs text-slate-400 sm:px-10">
        &copy; 2026 State Bank of India. All rights reserved.
      </footer>
    </div>
  );
}
