import {
    Home,
    FolderKanban,
    History,
    Settings,
  } from "lucide-react";
  
  export default function Sidebar() {
    return (
      <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-4">
        <nav className="space-y-2">
          <SidebarItem icon={<Home size={18} />} title="Workspace" />
          <SidebarItem
            icon={<FolderKanban size={18} />}
            title="Collections"
          />
          <SidebarItem
            icon={<History size={18} />}
            title="History"
          />
          <SidebarItem
            icon={<Settings size={18} />}
            title="Settings"
          />
        </nav>
      </aside>
    );
  }
  
  function SidebarItem({
    icon,
    title,
  }: {
    icon: React.ReactNode;
    title: string;
  }) {
    return (
      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-zinc-300 transition hover:bg-zinc-900 hover:text-white">
        {icon}
        <span>{title}</span>
      </button>
    );
  }