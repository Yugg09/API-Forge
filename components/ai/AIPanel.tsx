"use client";

import {
  BrainCircuit,
  FlaskConical,
  Search,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import PanelHeader from "@/components/layout/PanelHeader";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  method: string;
  url: string;
  requestBody: string;
  response: string;
  status: number;
};

const aiActions = [
  {
    endpoint: "explain",
    label: "Explain API",
    icon: BrainCircuit,
    variant: "default" as const,
  },
  {
    endpoint: "generate-tests",
    label: "Generate Tests",
    icon: FlaskConical,
    variant: "secondary" as const,
  },
  {
    endpoint: "analyze-response",
    label: "Analyze Response",
    icon: Search,
    variant: "outline" as const,
  },
];

export default function AIPanel({
  method,
  url,
  requestBody,
  response,
  status,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [activeAction, setActiveAction] = useState("");

  async function callAI(endpoint: string) {
    try {
      setLoading(true);
      setActiveAction(endpoint);
      setOutput("");

      const res = await fetch(
        `http://localhost:8000/api/ai/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            method,
            url,
            body: requestBody ? JSON.parse(requestBody || "{}") : {},
            requestBody: requestBody
              ? JSON.parse(requestBody || "{}")
              : {},
            response: response
              ? JSON.parse(response || "{}")
              : {},
            status,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setOutput(data.message);
        return;
      }

      setOutput(
        data.explanation ||
          data.tests ||
          data.analysis ||
          "No response from AI."
      );
    } catch {
      setOutput("AI request failed. Make sure you're logged in and the server is running.");
    } finally {
      setLoading(false);
    }
  }

  const hasContext = !!url;

  return (
    <div className="panel-surface">
      <PanelHeader
        title="AI Assistant"
        description="Powered by Gemini"
        icon={<Sparkles className="size-4" />}
      />

      <div className="flex flex-col gap-4 p-5">
        <div className="grid gap-2">
          {aiActions.map(({ endpoint, label, icon: Icon, variant }) => (
            <Button
              key={endpoint}
              variant={variant}
              size="sm"
              className="h-9 justify-start gap-2"
              disabled={loading || !hasContext}
              onClick={() => callAI(endpoint)}
            >
              <Icon className="size-4" />
              {label}
            </Button>
          ))}
        </div>

        {!hasContext && (
          <p className="rounded-lg border border-dashed border-border bg-muted/20 px-3 py-2.5 text-center text-xs text-muted-foreground">
            Send a request first to enable AI features
          </p>
        )}

        {loading && (
          <div className="space-y-2 rounded-lg border border-border bg-muted/20 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 animate-pulse text-primary" />
              Analyzing with Gemini...
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
        )}

        {!loading && output && (
          <ScrollArea className="max-h-[calc(100vh-280px)]">
            <div className="rounded-lg border border-border bg-muted/20">
              <div className="border-b border-border px-3 py-2">
                <p className="text-xs font-medium text-muted-foreground">
                  {aiActions.find((a) => a.endpoint === activeAction)?.label ?? "Result"}
                </p>
              </div>
              <pre className="scrollbar-thin max-h-96 overflow-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed">
                {output}
              </pre>
            </div>
          </ScrollArea>
        )}

        {!loading && !output && hasContext && (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-muted/10 px-4 py-10 text-center">
            <BrainCircuit className="mb-2 size-8 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">
              Choose an action above to get AI insights
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
