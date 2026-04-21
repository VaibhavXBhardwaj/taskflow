export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col bg-zinc-950 p-12 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8L6.5 11.5L13 4.5"
                  stroke="#18181b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-semibold text-white tracking-tight">Taskflow</span>
          </div>
        </div>
        <div className="relative z-10 mt-auto">
          <blockquote className="text-zinc-300 text-lg leading-relaxed font-light">
            &ldquo;The key is not to prioritize what&apos;s on your schedule, but to
            schedule your priorities.&rdquo;
          </blockquote>
          <p className="mt-4 text-zinc-600 text-sm">— Stephen Covey</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center p-8 bg-white">
        {children}
      </div>
    </div>
  );
}