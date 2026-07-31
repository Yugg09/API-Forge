type ResponsePanelProps = {
    response: string;
    status: number;
    time: number;
    size: number;
  };
  
  export default function ResponsePanel({
    response,
    status,
    time,
    size,
  }: ResponsePanelProps) {
    return (
      <div className="h-full overflow-auto p-5">
        <h2 className="mb-4 text-xl font-semibold">Response</h2>
  
        {/* Response Info */}
        <div className="mb-4 flex gap-6 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
          <p>Status: {status || "-"}</p>
          <p>Time: {time} ms</p>
          <p>Size: {size} B</p>
        </div>
  
        {/* JSON */}
        <pre className="whitespace-pre-wrap rounded-lg bg-zinc-900 p-4">
          {response || "No Response Yet"}
        </pre>
      </div>
    );
  }