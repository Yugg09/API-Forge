"use client";

import { SendHorizontal } from "lucide-react";

import PanelHeader from "@/components/layout/PanelHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatJson, getStatusBadgeClass } from "@/lib/http-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ResponsePanelProps = {
  response: string;
  status: number;
  time: number;
  size: number;
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function ResponsePanel({
  response,
  status,
  time,
  size,
}: ResponsePanelProps) {
  const [copied, setCopied] = useState(false);
  const hasResponse = !!response;
  const formatted = hasResponse ? formatJson(response) : "";

  async function copyResponse() {
    if (!response) return;
    await navigator.clipboard.writeText(formatted || response);
    setCopied(true);
    toast.success("Response copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="panel-surface border-r border-border">
      <PanelHeader
        title="Response"
        description={hasResponse ? "Request completed" : "Waiting for a request"}
        icon={<SendHorizontal className="size-4 rotate-180" />}
        actions={
          hasResponse && (
            <Button variant="outline" size="sm" onClick={copyResponse}>
              {copied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
              Copy
            </Button>
          )
        }
      />

      <div className="flex shrink-0 items-center gap-3 border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Status</span>
          <Badge
            variant="outline"
            className={cn(
              "font-mono text-xs",
              getStatusBadgeClass(status)
            )}
          >
            {status || "-"}
          </Badge>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Time</span>
          <span className="font-mono text-xs font-medium">
            {time ? time + " ms" : "-"}
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Size</span>
          <span className="font-mono text-xs font-medium">
            {size ? formatBytes(size) : "-"}
          </span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-5">
          {!hasResponse ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
              <SendHorizontal className="mb-3 size-10 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">
                No response yet
              </p>
              <p className="mt-1 max-w-xs text-xs text-muted-foreground/70">
                Send a request from the builder to see the response here
              </p>
            </div>
          ) : (
            <pre className="code-block scrollbar-thin max-h-none overflow-auto whitespace-pre-wrap break-words">
              {formatted}
            </pre>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
