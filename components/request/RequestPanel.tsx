"use client";

import { useState } from "react";

import BodyEditor from "../request-builder/BodyEditor";
import HeaderEditor from "../request-builder/HeaderEditor";
import RequestTabs from "../request-builder/RequestTabs";
import RequestToolbar from "../request-builder/RequestToolbar";

type Header = {
  key: string;
  value: string;
};

type RequestPanelProps = {
  setResponse: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
};

const INITIAL_HEADER: Header = {
  key: "",
  value: "",
};

export default function RequestPanel({
  setResponse,
  setStatus,
  setTime,
  setSize,
}: RequestPanelProps) {
  // Request State
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");

  // Headers State
  const [headers, setHeaders] = useState<Header[]>([
    INITIAL_HEADER,
  ]);

  // UI State
  const [activeTab, setActiveTab] =
    useState("Headers");

  function updateHeader(
    index: number,
    field: "key" | "value",
    value: string
  ) {
    const updatedHeaders = [...headers];

    updatedHeaders[index][field] = value;

    setHeaders(updatedHeaders);
  }

  function addHeader() {
    setHeaders([
      ...headers,
      INITIAL_HEADER,
    ]);
  }

  function removeHeader(index: number) {
    if (headers.length === 1) {
      setHeaders([INITIAL_HEADER]);
      return;
    }

    setHeaders(
      headers.filter(
        (_, i) => i !== index
      )
    );
  }

  function validateBody() {
    if (method === "GET") return true;

    if (!body.trim()) return true;

    try {
      JSON.parse(body);
      return true;
    } catch {
      setResponse("Invalid JSON");
      return false;
    }
  }

  function buildHeaders() {
    const requestHeaders = headers.reduce(
      (acc, header) => {
        const key = header.key.trim();

        if (key) {
          acc[key] = header.value;
        }

        return acc;
      },
      {} as Record<string, string>
    );

    const hasContentType =
      Object.keys(requestHeaders).some(
        (key) =>
          key.toLowerCase() ===
          "content-type"
      );

    return {
      ...requestHeaders,

      ...(!hasContentType &&
      method !== "GET"
        ? {
            "Content-Type":
              "application/json",
          }
        : {}),
    };
  }

  async function sendRequest() {
    if (!validateBody()) return;

    const finalHeaders = buildHeaders();

    try {
      const startTime = performance.now();

      const res = await fetch(url, {
        method,
        headers: finalHeaders,
        body: method === "GET" ? undefined : body,
      });

      const endTime = performance.now();

      const data = await res.json();
      const formattedData = JSON.stringify(
        data,
        null,
        2
      );

      setResponse(formattedData);
      setStatus(res.status);
      setTime(
        Math.round(endTime - startTime)
      );
      setSize(
        new Blob([formattedData]).size
      );
    } catch (error) {
      console.error(error);
      setResponse("Request Failed");
    }
  }

  return (
    <div className="border-r border-zinc-800 p-5">
      <h2 className="mb-4 text-xl font-semibold">
        Request Builder
      </h2>

      <RequestToolbar
        method={method}
        url={url}
        onMethodChange={setMethod}
        onUrlChange={setUrl}
        onSend={sendRequest}
      />

      <RequestTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "Body" && (
        <BodyEditor
          body={body}
          onBodyChange={setBody}
        />
      )}

      {activeTab === "Headers" && (
        <HeaderEditor
          headers={headers}
          onHeaderChange={updateHeader}
          onAddHeader={addHeader}
          onRemoveHeader={removeHeader}
        />
      )}
    </div>
  );
}