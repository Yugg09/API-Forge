"use client";

import { Settings } from "lucide-react";
import { useTheme } from "next-themes";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPanel() {
  const { theme } = useTheme();

  return (
    <div className="h-full overflow-auto p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            <Settings className="size-6" />
            Settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your workspace preferences.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how API Forge looks on your device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Current: {theme ?? "system"}
                </p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Backend connection settings for this workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>API Base URL</Label>
              <p className="mt-1 rounded-md border border-border bg-muted/50 px-3 py-2 font-mono text-sm">
                http://localhost:8000
              </p>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">
              Environment-based configuration will be available in a future
              update.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
