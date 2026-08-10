import { cn } from "@/lib/utils";

type PanelHeaderProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export default function PanelHeader({
  title,
  description,
  icon,
  actions,
  className,
}: PanelHeaderProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-between border-b border-border px-5 py-3.5",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        {icon && (
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-sm font-semibold leading-none">{title}</h2>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
