"use client";

import { Clock, History, Inbox } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

import { MethodBadge } from "@/lib/http-utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryPanel() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRequests(res.data.data || []);
      } catch (err) {
        console.error("History Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  return (
    <div className="scrollbar-thin h-full overflow-auto p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="flex items-center gap-2.5 text-xl font-semibold">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <History className="size-4.5" />
            </div>
            Request History
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Browse your previously saved API requests
          </p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="space-y-2 pt-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
            <Inbox className="mb-3 size-10 text-muted-foreground/40" />
            <p className="text-sm font-medium text-muted-foreground">
              No history yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Send requests from the workspace to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {requests.map((item: any) => (
              <Card
                key={item._id}
                className="transition-colors hover:bg-muted/30"
              >
                <CardContent className="flex items-start gap-4 pt-4">
                  <MethodBadge method={item.method} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {item.name || "Untitled Request"}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                      {item.url}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-[10px]">
                    Saved
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
