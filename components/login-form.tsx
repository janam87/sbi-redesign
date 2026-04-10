"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onSubmit: () => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Username */}
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-slate-700"
        >
          Username
        </label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          className="h-12 rounded-[10px] bg-slate-50 border-slate-200 px-4 text-base placeholder:text-slate-400"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="h-12 rounded-[10px] bg-slate-50 border-slate-200 px-4 pr-12 text-base placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Forgot password */}
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      {/* Sign In button */}
      <Button
        type="submit"
        className="h-12 w-full rounded-[10px] text-base font-semibold"
      >
        Sign In
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-sm text-slate-400">or</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Create account */}
      <p className="text-center text-sm text-slate-500">
        New to SBI?{" "}
        <button
          type="button"
          className="font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Create account
        </button>
      </p>
    </form>
  );
}
