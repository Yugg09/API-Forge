"use client";

type RequestTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const tabs = ["Headers", "Params", "Body", "Auth"];

export default function RequestTabs({
  activeTab,
  onTabChange,
}: RequestTabsProps) {
  return (
    <div className="mt-6 flex gap-6 border-b border-zinc-800 pb-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={activeTab === tab ? "text-blue-500" : ""}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}