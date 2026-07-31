"use client";

import { useState } from "react";

type RequestPanelProps = {
    setResponse: React.Dispatch<React.SetStateAction<string>>;
  };
  
  export default function RequestPanel({
    setResponse,
  }: RequestPanelProps) {
  const [url, setUrl] = useState("");

  async function sendRequest() {
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse("Request Failed");
    }
  }

  return (
    <div className="border-r border-zinc-800 p-5">
      <h2 className="mb-4 text-xl font-semibold">
        Request Builder
      </h2>

      {/* Method + URL + Send */}
      <div className="flex gap-3">
        <select className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 outline-none"
          placeholder="https://api.example.com"
        />

        <button
         onClick={sendRequest}
          className="rounded-lg bg-blue-600 px-6 py-2 font-medium hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-6 border-b border-zinc-800 pb-3">
        <button className="text-blue-500">Headers</button>
        <button>Params</button>
        <button>Body</button>
        <button>Auth</button>
      </div>
    </div>
  );
}