"use client";

import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HTTP_METHODS, MethodBadge } from "@/lib/http-utils";

type RequestToolbarProps = {
  method: string;
  url: string;
  loading?: boolean;
  onMethodChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  onSend: () => void;
};

export default function RequestToolbar({
  method,
  url,
  loading = false,
  onMethodChange,
  onUrlChange,
  onSend,
}: RequestToolbarProps) {
  return (
    <div className="flex shrink-0 gap-2 rounded-xl border border-border bg-muted/20 p-2">
      <Select value={method} onValueChange={(value) => onMethodChange(value ?? method)}>
        <SelectTrigger className="h-9 w-[108px] border-0 bg-background shadow-sm">
          <SelectValue>
            <MethodBadge method={method} />
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {HTTP_METHODS.map((m) => (
            <SelectItem key={m} value={m}>
              <MethodBadge method={m} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="https://api.example.com/endpoint"
        className="h-9 flex-1 border-0 bg-background font-mono text-sm shadow-sm"
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            onSend();
          }
        }}
      />

      <Button
        onClick={onSend}
        disabled={loading || !url.trim()}
        className="h-9 min-w-[92px] shadow-sm shadow-primary/20"
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Send
      </Button>
    </div>
  );
}
