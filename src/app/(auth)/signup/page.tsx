import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create account",
};

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm">
      {/* Mobile logo */}
      <Link href="/" className="lg:hidden flex items-center gap-2.5 mb-10">
        <div className="w-7 h-7 bg-zinc-900 rounded-md flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-semibold text-zinc-900 tracking-tight">Taskflow</span>
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Create an account</h1>
        <p className="mt-1.5 text-zinc-500 text-sm">Start managing your tasks in seconds.</p>
      </div>

      <SignupForm />
    </div>
  );
}