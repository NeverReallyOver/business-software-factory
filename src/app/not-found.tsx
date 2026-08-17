import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <EmptyState
        icon={FileQuestion}
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
        action={
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Go home
          </Link>
        }
        className="border-0"
      />
    </main>
  );
}
