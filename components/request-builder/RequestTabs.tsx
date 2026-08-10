"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RequestTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
};

const tabs = ["Headers", "Params", "Path", "Body", "Auth"] as const;

export default function RequestTabs({
  activeTab,
  onTabChange,
  children,
}: RequestTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value ?? activeTab)}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <TabsList variant="line" className="h-auto w-full shrink-0 justify-start gap-0 bg-transparent px-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="rounded-none px-4 py-2.5 text-xs data-active:font-semibold"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="scrollbar-thin flex-1 overflow-auto pt-4">{children}</div>
    </Tabs>
  );
}

export { TabsContent };
