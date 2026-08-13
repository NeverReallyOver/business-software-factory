import type { ReactNode } from "react";

/** Centered layout for authentication pages. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
