"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors"
    >
      Sign out
    </button>
  );
}