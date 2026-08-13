"use client"

import { Toast } from "@base-ui/react/toast"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Global toast manager. Mount <Toaster /> once at the app root, then call the
 * `toast` helper from any client component to show transient feedback.
 */
const manager = Toast.createToastManager()

export const toast = {
  success: (title: string, description?: string) =>
    manager.add({ title, description, type: "success" }),
  error: (title: string, description?: string) =>
    manager.add({ title, description, type: "error" }),
  message: (title: string, description?: string) =>
    manager.add({ title, description }),
}

export function Toaster() {
  return (
    <Toast.Provider toastManager={manager} limit={3}>
      <Toast.Portal>
        <Toast.Viewport className="fixed bottom-0 right-0 z-[100] flex w-full max-w-sm flex-col gap-2 p-4 outline-none">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()

  return toasts.map((item) => {
    const isError = item.type === "error"
    return (
      <Toast.Root
        key={item.id}
        toast={item}
        className={cn(
          "relative rounded-lg border bg-card p-3 pr-8 text-card-foreground shadow-lg ring-1 ring-foreground/10 transition-opacity",
          "data-[starting]:opacity-0 data-[ending]:opacity-0",
          isError && "border-destructive/30",
        )}
      >
        <Toast.Title
          className={cn("text-sm font-medium", isError && "text-destructive")}
        >
          {item.title}
        </Toast.Title>
        {item.description ? (
          <Toast.Description className="text-sm text-muted-foreground">
            {item.description}
          </Toast.Description>
        ) : null}
        <Toast.Close
          aria-label="Close"
          className="absolute right-1.5 top-1.5 rounded-md p-1 text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-4" aria-hidden="true" />
        </Toast.Close>
      </Toast.Root>
    )
  })
}
