"use client";

import {
  FolderKanban,
  History,
  Home,
  Settings,
  Sparkles,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

type SidebarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const navItems = [
  { id: "workspace", icon: Home, title: "Workspace", description: "Build & test" },
  { id: "collections", icon: FolderKanban, title: "Collections", description: "Organize APIs" },
  { id: "history", icon: History, title: "History", description: "Past requests" },
] as const;

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Sparkles className="size-3.5" />
          Navigation
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 p-3">
        {navItems.map(({ id, icon: Icon, title, description }) => (
          <SidebarItem
            key={id}
            icon={<Icon className="size-4" />}
            title={title}
            description={description}
            active={activeTab === id}
            onClick={() => onTabChange(id)}
          />
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <SidebarItem
          icon={<Settings className="size-4" />}
          title="Settings"
          active={activeTab === "settings"}
          onClick={() => onTabChange("settings")}
        />
      </div>
    </aside>
  );
}
