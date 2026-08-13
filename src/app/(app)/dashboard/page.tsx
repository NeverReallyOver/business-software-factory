import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProfile } from "@/features/auth/server";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const profile = await getProfile();
  const name = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Welcome back, {name}
        </h1>
        <p className="text-sm text-muted-foreground">
          This is your dashboard. Feature pages appear here as they are added.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your current sign-in details.</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
            <dt className="text-muted-foreground">Email</dt>
            <dd>{profile?.email}</dd>
            <dt className="text-muted-foreground">Role</dt>
            <dd className="capitalize">{profile?.role}</dd>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
