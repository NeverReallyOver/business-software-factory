# components/ui/

shadcn/ui primitives (Button, Input, Card, Table, AlertDialog, Spinner, ...).
Do not fork or duplicate.

## Toasts

`toast.tsx` exports `<Toaster />` (mounted once in the root layout) and a `toast`
helper for transient feedback from any client component:

```ts
import { toast } from "@/components/ui/toast";
toast.success("Saved");
toast.error("Something went wrong");
```
