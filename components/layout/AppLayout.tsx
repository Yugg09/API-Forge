import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-white">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}