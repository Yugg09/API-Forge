import { cn } from "@/lib/utils";

export const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"] as const;
export type HttpMethod = (typeof HTTP_METHODS)[number];

export function getMethodBadgeClass(method: string): string {
  switch (method.toUpperCase()) {
    case "GET":
      return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
    case "POST":
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
    case "PUT":
      return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30";
    case "DELETE":
      return "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export function getStatusBadgeClass(status: number): string {
  if (status === 0) return "bg-muted text-muted-foreground border-border";
  if (status >= 200 && status < 300)
    return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
  if (status >= 300 && status < 400)
    return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30";
  if (status >= 400 && status < 500)
    return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
  return "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30";
}

export function formatJson(text: string): string {
  if (!text.trim()) return text;
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
}

export function MethodBadge({
  method,
  className,
}: {
  method: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-semibold",
        getMethodBadgeClass(method),
        className
      )}
    >
      {method.toUpperCase()}
    </span>
  );
}
