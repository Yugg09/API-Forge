import { Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
          ⚒
        </div>

        <div>
          <h1 className="text-lg font-semibold">API Forge</h1>
          <p className="text-xs text-zinc-400">
            AI Powered API Workspace
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <Search className="h-5 w-5 text-zinc-400" />
        <UserCircle2 className="h-8 w-8 text-zinc-400" />
      </div>
    </header>
  );
}