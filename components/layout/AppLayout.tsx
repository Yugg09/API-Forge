import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function AppLayout({
  children,
  activeTab,
  setActiveTab,
}: AppLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-hidden bg-background">{children}</main>
      </div>
    </div>
  );
}
