import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { TaskList } from "@/components/tasks/TaskList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: { name: true, email: true },
  });

  if (!user) redirect("/login");

  const firstName = user.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
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

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
            Good day, {firstName}
          </h1>
          <p className="mt-1 text-zinc-500 text-sm">
            Here&apos;s what&apos;s on your plate.
          </p>
        </div>
        <TaskList />
      </main>
    </div>
  );
}