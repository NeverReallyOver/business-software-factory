"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log for diagnostics; never surface internal detail to the user.
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <ErrorState onRetry={reset} className="max-w-md border-0" />
    </main>
  );
}
