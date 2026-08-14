import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireRole } from "@/features/auth/server";
import { SettingsForm } from "@/features/settings/components/settings-form";
import { getAppSettings } from "@/features/settings/queries";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  await requireRole(["owner"]);
  const settings = await getAppSettings();

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <PageHeader
        title="Settings"
        description="Workspace configuration for everyone in this account."
      />

      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Branding and contact details.</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm
            defaultAppName={settings.app_name}
            defaultSupportEmail={settings.support_email ?? ""}
          />
        </CardContent>
      </Card>
    </div>
  );
}
