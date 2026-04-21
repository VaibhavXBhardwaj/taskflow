import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taskflow — Stay organized, ship faster",
};

const features = [
  {
    title: "Task Management",
    description:
      "Create, organize, and track tasks with priorities and due dates. Stay on top of everything.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    title: "Secure by Default",
    description:
      "JWT authentication with httpOnly cookies. Your data is encrypted and protected at every layer.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
  {
    title: "Always Available",
    description:
      "Deployed on Vercel with a globally replicated database. Your tasks load fast, everywhere.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-zinc-100 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-zinc-900 rounded-md flex items-center justify-center flex-shrink-0">
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
          <nav className="flex items-center gap-1">
            <Link
              href="/login"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-4 py-2 rounded-lg hover:bg-zinc-50"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors font-medium"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-zinc-50 border border-zinc-200 text-zinc-600 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          Open source · MIT License
        </div>
        <h1 className="text-5xl sm:text-6xl font-semibold text-zinc-900 leading-[1.1] tracking-tight max-w-3xl mx-auto">
          Stay organized,
          <br />
          ship faster.
        </h1>
        <p className="mt-6 text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed">
          Taskflow is a minimal task management tool designed to help you focus on
          what matters — getting things done without the noise.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/signup"
            className="bg-zinc-900 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Start for free
          </Link>
          <Link
            href="/login"
            className="text-sm text-zinc-600 font-medium px-6 py-3 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
          >
            Sign in to your account
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 hover:border-zinc-200 transition-colors"
            >
              <div className="w-10 h-10 bg-white rounded-xl border border-zinc-200 flex items-center justify-center mb-4 shadow-sm">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-zinc-700"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2 text-sm">{feature.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Taskflow. MIT License.</p>
          <a
            href="https://github.com/YOUR_USERNAME/taskflow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </footer>
    </div>
  );
}