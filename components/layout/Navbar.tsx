"use client";

import { Hammer, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    router.push("/login");
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/80 px-5 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25">
          <Hammer className="size-4.5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold leading-none tracking-tight">
              API Forge
            </h1>
            <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-medium">
              Beta
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            AI-powered API workspace
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <kbd className="hidden items-center gap-1 rounded-md border border-border bg-muted/50 px-2 py-1 text-[10px] font-medium text-muted-foreground sm:inline-flex">
          <span>⌘</span>
          <span>↵</span>
          <span className="ml-0.5">Send</span>
        </kbd>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" aria-label="Account menu">
                <LogIn className="size-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            {isLoggedIn ? (
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="size-4" />
                Log out
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                render={
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="size-4" />
                    Log in
                  </Link>
                }
              />
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Profile (coming soon)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
