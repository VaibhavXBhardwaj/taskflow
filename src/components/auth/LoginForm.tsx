"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginSchema } from "@/lib/validations";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const raw = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = loginSchema.safeParse(raw);
    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong");
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1.5">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent
            transition-all placeholder:text-zinc-400 bg-white"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent
            transition-all placeholder:text-zinc-400 bg-white"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-zinc-900 text-white text-sm font-medium py-2.5 px-4 rounded-lg
          hover:bg-zinc-700 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-zinc-900 hover:underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </form>
  );
}