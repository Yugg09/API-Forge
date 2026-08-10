import { FolderKanban, Plus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CollectionsPanel() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <Card className="w-full max-w-md text-center shadow-lg shadow-primary/5">
        <CardHeader>
          <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FolderKanban className="size-7" />
          </div>
          <CardTitle className="text-lg">Collections</CardTitle>
          <CardDescription>
            Organize your API requests into collections for faster testing
            workflows.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Group related endpoints, share with your team, and run batch tests —
            all coming soon.
          </p>
          <Button variant="outline" disabled className="gap-2">
            <Plus className="size-4" />
            Create Collection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
