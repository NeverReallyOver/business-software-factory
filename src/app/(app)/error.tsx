"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";

export default function AppSectionError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <ErrorState onRetry={reset} className="max-w-md border-0" />
    </div>
  );
}
