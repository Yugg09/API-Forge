"use client";

import { useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import RequestPanel from "@/components/request/RequestPanel";
import ResponsePanel from "@/components/response/ResponsePanel";
import HistoryPanel from "@/components/history/HistoryPanel";
import CollectionsPanel from "@/components/collections/CollectionsPanel";
import SettingsPanel from "@/components/settings/SettingsPanel";
import AIPanel from "@/components/ai/AIPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState(0);
  const [size, setSize] = useState(0);
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [activeTab, setActiveTab] = useState("workspace");

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "workspace" && (
        <ResizablePanelGroup orientation="horizontal" className="h-full">
          <ResizablePanel defaultSize={38} minSize={28}>
            <RequestPanel
              setResponse={setResponse}
              setStatus={setStatus}
              setTime={setTime}
              setSize={setSize}
              setMethod={setMethod}
              setUrl={setUrl}
              setRequestBody={setRequestBody}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={34} minSize={22}>
            <ResponsePanel
              response={response}
              status={status}
              time={time}
              size={size}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={28} minSize={20}>
            <AIPanel
              method={method}
              url={url}
              requestBody={requestBody}
              response={response}
              status={status}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}

      {activeTab === "collections" && <CollectionsPanel />}
      {activeTab === "history" && <HistoryPanel />}
      {activeTab === "settings" && <SettingsPanel />}
    </AppLayout>
  );
}
