"use client";

import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type KeyValuePair = {
  key: string;
  value: string;
};

type KeyValueEditorProps = {
  title: string;
  items: KeyValuePair[];
  onItemChange: (
    index: number,
    field: "key" | "value",
    value: string
  ) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  addLabel?: string;
};

export default function KeyValueEditor({
  title,
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
  keyPlaceholder = "Key",
  valuePlaceholder = "Value",
  addLabel = "Add row",
}: KeyValueEditorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>

      <div className="overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-[1fr_1fr_36px] gap-0 border-b border-border bg-muted/30 px-3 py-2">
          <span className="text-xs font-medium text-muted-foreground">Key</span>
          <span className="text-xs font-medium text-muted-foreground">Value</span>
          <span />
        </div>

        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_36px] items-center gap-0 border-b border-border last:border-b-0"
          >
            <Input
              placeholder={keyPlaceholder}
              value={item.key}
              onChange={(e) => onItemChange(index, "key", e.target.value)}
              className="rounded-none border-0 border-r border-border bg-transparent shadow-none focus-visible:ring-0"
            />
            <Input
              placeholder={valuePlaceholder}
              value={item.value}
              onChange={(e) => onItemChange(index, "value", e.target.value)}
              className="rounded-none border-0 border-r border-border bg-transparent shadow-none focus-visible:ring-0"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => onRemoveItem(index)}
              aria-label="Remove row"
              className="size-9 rounded-none text-muted-foreground hover:text-destructive"
            >
              <X className="size-3.5" />
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={onAddItem}>
        <Plus className="size-3.5" />
        {addLabel}
      </Button>
    </div>
  );
}
