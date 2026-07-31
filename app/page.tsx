"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import RequestPanel from "@/components/request/RequestPanel";
import ResponsePanel from "@/components/response/ResponsePanel";

export default function Home() {
  const [response, setResponse] = useState("");

  return (
    <AppLayout>
      <div className="grid h-full grid-cols-2">
        <RequestPanel setResponse={setResponse} />
        <ResponsePanel response={response} />
      </div>
    </AppLayout>
  );
}