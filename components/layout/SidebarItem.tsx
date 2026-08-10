"use client";

import { cn } from "@/lib/utils";

type SidebarItemProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  active: boolean;
  onClick: () => void;
};

export default function SidebarItem({
  icon,
  title,
  description,
  active,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all",
        active
          ? "bg-sidebar-primary/10 text-sidebar-primary shadow-sm ring-1 ring-sidebar-primary/20"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md transition-colors",
          active
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "bg-sidebar-accent/60 text-sidebar-foreground/70"
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium leading-none">{title}</span>
        {description && (
          <span className="mt-1 block truncate text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </span>
    </button>
  );
}
