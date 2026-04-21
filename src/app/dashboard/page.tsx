import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: { name: true, email: true, createdAt: true },
  });

  if (!user) redirect("/login");

  const firstName = user.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-zinc-900 rounded-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8L6.5 11.5L13 4.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-semibold text-zinc-900 tracking-tight">Taskflow</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400 hidden sm:block">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
            Good day, {firstName}
          </h1>
          <p className="mt-1 text-zinc-500 text-sm">
            Task management dashboard — full features shipping tomorrow.
          </p>
        </div>

        {/* Placeholder cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Tasks", value: "0" },
            { label: "In Progress", value: "0" },
            { label: "Completed", value: "0" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-zinc-100 p-5">
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-3xl font-semibold text-zinc-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-zinc-100 p-12 text-center">
          <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h3 className="font-medium text-zinc-700 mb-1">No tasks yet</h3>
          <p className="text-sm text-zinc-400">Task creation is coming in the next build.</p>
        </div>
      </main>
    </div>
  );
}